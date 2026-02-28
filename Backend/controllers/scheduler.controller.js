import { google } from "googleapis";
import { User } from "../models/user.model.js";
import Availability from "../models/availability.model.js";
import Interview from "../models/interview.model.js";
import Application from "../models/application.model.js";
import sendEmail from "../utils/email.js";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NODE_ENV === "production"
    ? "https://www.jobsyncc.com/api/scheduler/google/callback"
    : process.env.GOOGLE_REDIRECT_URL
);

// 1. Generate Google Auth URL
export const getAuthUrl = async (req, res) => {
  try {
    const scopes = ["https://www.googleapis.com/auth/calendar.events"];
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      prompt: "consent",
      state: req.id, // pass userId so we can identify user in callback
    });
    return res.status(200).json({ url, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// 2. Google Refresh Token Callback (GET - Google redirects here)
export const googleCallback = async (req, res) => {
  try {
    const { code, state: userId } = req.query; // code & userId from query params

    const frontendBase =
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : `http://localhost:${process.env.PORT || 5000}`;

    if (!code || !userId) {
      return res.redirect(`${frontendBase}/admin/scheduler?error=missing_params`);
    }

    const { tokens } = await oauth2Client.getToken(code);

    await User.findByIdAndUpdate(userId, {
      googleTokens: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiryDate: tokens.expiry_date,
      },
      isGoogleConnected: true,
    });

    // Redirect back to frontend scheduler page with success
    return res.redirect(`${frontendBase}/admin/scheduler?connected=true`);
  } catch (error) {
    console.log(error);
    const frontendBase =
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : `http://localhost:${process.env.PORT || 5000}`;
    return res.redirect(`${frontendBase}/admin/scheduler?error=failed`);
  }
};

// 3. Set Availability
export const setAvailability = async (req, res) => {
  try {
    const { day, slots } = req.body; // slots: [{startTime, endTime}]
    const recruiterId = req.id;

    let availability = await Availability.findOne({ recruiter: recruiterId, day });

    if (availability) {
      availability.slots = slots;
      await availability.save();
    } else {
      availability = await Availability.create({
        recruiter: recruiterId,
        day,
        slots,
      });
    }

    return res.status(200).json({ availability, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// 4. Get Availability (for Candidate)
export const getAvailability = async (req, res) => {
  try {
    const { recruiterId } = req.params;
    const availability = await Availability.find({ recruiter: recruiterId });
    return res.status(200).json({ availability, success: true });
  } catch (error) {
    console.log(error);
  }
};

// 5. Schedule Interview
export const scheduleInterview = async (req, res) => {
  try {
    const { applicationId, startTime, endTime, slotId, availabilityId } = req.body;
    const candidateId = req.id;

    const application = await Application.findById(applicationId).populate("job").populate("applicant");
    if (!application) return res.status(404).json({ message: "Application not found", success: false });

    const recruiter = await User.findById(application.job.created_by);
    if (!recruiter || !recruiter.googleTokens) {
      return res.status(400).json({ message: "Recruiter has not connected Google Calendar", success: false });
    }

    // Set credentials for Google API
    oauth2Client.setCredentials({
      access_token: recruiter.googleTokens.accessToken,
      refresh_token: recruiter.googleTokens.refreshToken,
      expiry_date: recruiter.googleTokens.expiryDate,
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const event = {
      summary: `Interview: ${application.job.title} - JobSyncc`,
      description: `Interview for ${application.applicant.fullname} for the position of ${application.job.title}.`,
      start: { dateTime: new Date(startTime).toISOString() },
      end: { dateTime: new Date(endTime).toISOString() },
      conferenceData: {
        createRequest: { requestId: `sample123-${Date.now()}`, conferenceSolutionKey: { type: "hangoutsMeet" } },
      },
      attendees: [{ email: recruiter.email }, { email: application.applicant.email }],
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
    });

    const interview = await Interview.create({
      application: applicationId,
      candidate: candidateId,
      recruiter: recruiter._id,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      meetingLink: response.data.hangoutLink,
      googleEventId: response.data.id,
    });

    // Mark slot as booked
    await Availability.updateOne(
      { _id: availabilityId, "slots._id": slotId },
      { $set: { "slots.$.isBooked": true } }
    );

    // Send confirmation email
    const emailMessage = `
      <h1>Interview Scheduled!</h1>
      <p>Your interview for <strong>${application.job.title}</strong> has been scheduled.</p>
      <p><strong>Time:</strong> ${new Date(startTime).toLocaleString()}</p>
      <p><strong>Meeting Link:</strong> <a href="${response.data.hangoutLink}">${response.data.hangoutLink}</a></p>
    `;

    await sendEmail({
      email: application.applicant.email,
      subject: "Interview Scheduled - JobSyncc",
      message: emailMessage,
    });

    return res.status(201).json({ interview, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Scheduling failed", success: false });
  }
};
