import cron from "node-cron";
import Interview from "../models/interview.model.js";
import sendEmail from "./email.js";

// Run every minute
cron.schedule("* * * * *", async () => {
  try {
    const thirtyMinutesFromNow = new Date(Date.now() + 30 * 60000);
    const fifteenMinutesFromNow = new Date(Date.now() + 15 * 60000); // Buffer range

    // Find interviews starting in the 30-min window that haven't had a reminder
    const interviews = await Interview.find({
      startTime: {
        $gte: new Date(),
        $lte: thirtyMinutesFromNow,
      },
      reminderSent: false,
      status: "scheduled",
    }).populate({
      path: "application",
      populate: { path: "applicant" },
    });

    for (const interview of interviews) {
      const emailMessage = `
        <h1>Reminder: Interview in 30 Minutes!</h1>
        <p>Your interview for <strong>${interview.application.job.title}</strong> is starting soon.</p>
        <p><strong>Time:</strong> ${interview.startTime.toLocaleString()}</p>
        <p><strong>Meeting Link:</strong> <a href="${interview.meetingLink}">${interview.meetingLink}</a></p>
      `;

      await sendEmail({
        email: interview.application.applicant.email,
        subject: "Reminder: Interview in 30 Minutes - JobSyncc",
        message: emailMessage,
      });

      interview.reminderSent = true;
      await interview.save();
      console.log(`Reminder sent for interview: ${interview._id}`);
    }
  } catch (error) {
    console.error("Cron job error:", error);
  }
});
