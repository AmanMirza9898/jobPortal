import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import { Company } from "../models/company.model.js";
import sendEmail from "../utils/email.js";

  export const applyJob = async (req, res) => {
    try {
      const userId = req.id;
      // const {id:jobId}= req.params
      const jobId = req.params.id;
      if (!jobId)
        return res.status(400).json({
          message: "Job id is required",
          success: false,
        });

      //check if  the user hase already applyed for the job
      const existingApplication = await Application.findOne({
        job: jobId,
        applicant: userId,
      });
      if (existingApplication) {
        return res.status(400).json({
          message: "You have already applied for this jobs",
          success: false,
        });
      }

      //check if the job exists
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({
          message: "Job not found",
          success: false,
        });
      }

      //create a new application

      const newApplication = await Application.create({
        job: jobId,
        applicant: userId,
      });

      job.applications.push(newApplication._id);
      await job.save();
      return res.status(201).json({
        message: "Job applied succcessfully",
        success: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const getAppliedJobs = async (req, res) => {
    try {
      const userId = req.id;
      const application = await Application.find({ applicant: userId })
        .sort({ createdAt: -1 })
        .populate({
          path: "job",
          options: { sort: { createdAt: -1 } },
          populate: {
            path: "company",
            options: { sort: { createdAt: -1 } },
          },
        });

      if (!application) {
        return res.status(404).json({
          message: "No application",
          success: false,
        });
      }

      return res.status(200).json({
        application,
        success: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Admin dekhega kitne user ne apply kiya hai

  export const getApplicants = async (req, res) => {
    try {
      // const {id} = req.params;
      const jobId = req.params.id;
      const job = await Job.findById(jobId).populate({
        path: "applications",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "applicant",
        },
      });

      if (!job) {
        return res.status(404).json({
          message: "Job not found",
          success: false,
        });
      }

      return res.status(200).json({
        job,
        success: true,
      });
    } catch (err) {
      console.log(err);
    }
  };


  export const updateStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const applicationId = req.params.id;
      if (!status) {
        return res.status(404).json({
          message: "Status is required",
          success: false,
        })
      };

      // find appication by application id and populate applicant and job details for email
      const application = await Application.findOne({ _id: applicationId })
        .populate("applicant")
        .populate("job");

      if (!application) {
        return res.status(404).json({
          message: "Application not found",
          success: false
        })
      };

      // update the status
      application.status = status.toLowerCase();
      await application.save();

      // --- Automation: Send Professional Emails ---
      const applicantEmail = application.applicant.email;
      const applicantName = application.applicant.fullname;
      const jobTitle = application.job.title;

      let emailSubject = "";
      let emailMessage = "";

      if (application.status === "accepted") {
        emailSubject = `Congratulations! Interview Invitation for ${jobTitle} - JobSyncc`;
        emailMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #6a11cb; margin: 0;">JobSyncc</h1>
                <p style="color: #666; font-size: 14px;">Rise Above the Competition</p>
            </div>
            <div style="background-color: #f0fff4; padding: 20px; border-radius: 8px; border-left: 5px solid #48bb78;">
                <h2 style="color: #2f855a; margin-top: 0;">Great News, ${applicantName}!</h2>
                <p style="color: #555; line-height: 1.6;">Your application for the <strong>${jobTitle}</strong> position has been reviewed, and we are impressed with your profile.</p>
                <p style="color: #555; line-height: 1.6;">Please use the link below to select a suitable time for your interview:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/book-interview/${application.job.created_by}/${application._id}" style="background-color: #6a11cb; color: white; padding: 12px 25px; border-radius: 5px; font-weight: bold; text-decoration: none; display: inline-block;">Schedule Interview Now</a>
                </div>
                <p style="color: #666; font-size: 13px; text-align: center;">This link will take you to our one-click scheduler.</p>
            </div>
            <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
                <p>&copy; ${new Date().getFullYear()} JobSyncc. All rights reserved.</p>
            </div>
        </div>
        `;
      } else if (application.status === "rejected") {
        emailSubject = `Update regarding your application for ${jobTitle} - JobSyncc`;
        emailMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #6a11cb; margin: 0;">JobSyncc</h1>
                <p style="color: #666; font-size: 14px;">Rise Above the Competition</p>
            </div>
            <div style="background-color: #fff5f5; padding: 20px; border-radius: 8px; border-left: 5px solid #f56565;">
                <h2 style="color: #c53030; margin-top: 0;">Application Update</h2>
                <p style="color: #555; line-height: 1.6;">Hello ${applicantName},</p>
                <p style="color: #555; line-height: 1.6;">Thank you for your interest in the <strong>${jobTitle}</strong> position. After careful review, we regret to inform you that we will not be moving forward with your application at this time.</p>
                <p style="color: #555; line-height: 1.6;">However, we will keep your profile in our talent pool for future opportunities that match your skills.</p>
            </div>
            <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
                <p>&copy; ${new Date().getFullYear()} JobSyncc. All rights reserved.</p>
            </div>
        </div>
        `;
      }

      if (emailSubject && emailMessage) {
        try {
          await sendEmail({
            email: applicantEmail,
            subject: emailSubject,
            message: emailMessage,
          });
          console.log(`Automation: ${application.status} email sent to ${applicantEmail}`);
        } catch (emailErr) {
          console.error("Automation email failed:", emailErr);
          // Don't throw error here to avoid blocking the status update
        }
      }

      return res.status(200).json({
        message: "Status updated successfully",
        success: true
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  export const getRecruiterApplicants = async (req, res) => {
    try {
      const adminId = req.id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      // Find companies belonging to the admin
      const companies = await Company.find({ UserId: adminId });
      const companyIds = companies.map(c => c._id);

      // Find jobs associated with these companies
      const jobs = await Job.find({ company: { $in: companyIds } });
      const jobIds = jobs.map(j => j._id);

      // Get total count for pagination
      const totalApplications = await Application.countDocuments({ job: { $in: jobIds } });

      // Find paginated applications for these jobs
      const applications = await Application.find({ job: { $in: jobIds } })
        .populate({
          path: 'job',
          populate: {
            path: 'company'
          }
        })
        .populate('applicant')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      return res.status(200).json({
        applications,
        totalApplications,
        totalPages: Math.ceil(totalApplications / limit),
        currentPage: page,
        success: true
      })
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
        success: false
      })
    }
  }
