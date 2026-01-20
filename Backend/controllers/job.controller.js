
import Job from "../models/job.model.js";

// Admin Post krega job
export const PostJob = async (req,res)=>{
    try{
        const { title , description , requirements , salary , location , jobType, experience , position, companyId}= req.body;
        const  userId= req.id;
        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message: "Somthing is missing",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            position,
            company:companyId,
            created_by: userId
        })
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true,
        })
    }
    catch(err){
        console.log(err);
    }
}

// studen ke liye
export const getAllJobs = async (req,res)=>{
    try{
        const keyword = req.query.keyword|| '';
        const query = {
            $or:[
                {title:{$regex:keyword, $options: 'i'}},
                {description:{$regex:keyword, $options: 'i'}},
            ]
        };

        const jobs  = await Job.find(query).populate({ path: "company"}).sort({createdAt:-1});
        if (jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false,
            })
        };
         return res.status(200).json({
            jobs,
            success: true, 
         })
    }
    catch(err){
        console.log(err);
        
    }
}

//student
export const getJobById = async (req,res) =>{
    try{
        const JobId = req.params.id;
        const job = await Job.findById(JobId)
        if(!job){
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

    catch(err){
        console.log(err);
    }
}
//admin ne kitne job create kre hai abhi tk 

export const  getAdminJob = async (req,res)=>{
    try{
        const adminId = req.id;
        const jobs= await Job.find({created_by:adminId})
        if (jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found"
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    }
    catch(err){
        console.log(err);
        
    }
}

