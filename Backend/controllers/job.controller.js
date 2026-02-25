
import Job from "../models/job.model.js";
import { Company } from "../models/company.model.js";

// Admin Post krega job
export const PostJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;
        if (!title || !description || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somthing is missing",
                success: false
            })
        };

        // Check if companyId belongs to the user
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        if (company.UserId.toString() !== userId) {
            return res.status(403).json({
                message: "Unauthorized: You cannot post a job for this company.",
                success: false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements ? requirements.split(",") : [],
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: Number(experience),
            position: Number(position),
            company: companyId,
            created_by: userId
        })
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true,
        })
    }
    catch (err) {
        console.log("PostJob Error Details:", err);
        return res.status(400).json({
            message: err.message || "Internal server error",
            success: false
        })
    }
}

export const updateJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const jobId = req.params.id;

        const updatedData = {
            title,
            description,
            requirements: requirements ? requirements.split(",") : undefined,
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: Number(experience),
            position: Number(position),
            company: companyId
        };

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        }

        // Ownership check
        if (job.created_by.toString() !== req.id) {
            return res.status(403).json({
                message: "Unauthorized: You cannot update this job.",
                success: false
            })
        }

        const updatedJob = await Job.findByIdAndUpdate(jobId, updatedData, { new: true });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        }

        return res.status(200).json({
            message: "Job updated successfully.",
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        })
    }
}

// studen ke liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || '';
        const query = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
            ]
        };

        const jobs = await Job.find(query).populate({ path: "company" }).sort({ createdAt: -1 });
        if (jobs.length === 0) {
            return res.status(200).json({
                message: "Jobs not found",
                jobs: [],
                success: true,
            })
        };
        return res.status(200).json({
            jobs,
            success: true,
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

//student
export const getJobById = async (req, res) => {
    try {
        const JobId = req.params.id;
        const job = await Job.findById(JobId).populate({
            path: "applications"
        }).populate({
            path: "company"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false,
            })
        };

        return res.status(200).json({
            job,
            success: true,
        })
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}
//admin ne kitne job create kre hai abhi tk 

export const getAdminJob = async (req, res) => {
    try {
        const adminId = req.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Find companies belonging to the admin
        const companies = await Company.find({ UserId: adminId });
        const companyIds = companies.map(c => c._id);

        const totalJobs = await Job.countDocuments({ company: { $in: companyIds } });
        const jobs = await Job.find({ company: { $in: companyIds } })
            .populate({
                path: 'company'
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            totalJobs,
            totalPages: Math.ceil(totalJobs / limit),
            currentPage: page,
            success: true
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findByIdAndDelete(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        }

        return res.status(200).json({
            message: "Job deleted successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        })
    }
}

