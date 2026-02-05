import {Company} from "../models/company.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import { Readable } from "stream"; // Stream import zaroori hai
import getDataUri from "../utils/datauri.js";

export const registerCompany = async (req , res)=>{
    try{
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                success:false,
            });
        }
        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"Company already registered you cant regestier same company",
                success:false,
            });
        }

        company = await Company.create({
            name:companyName,
            UserId:req.userId,
        })

        return res.status(201).json({
            message:"Company registered successfully",
            company,   
            success:true,
            
        })

    }
    catch(err){
        return res.status(500).json({
            message:"Company registration failed",
            success:false, 
        })
    }
}


export const getCompany = async (req, res) => {

    try{
        const userId = req.userId;
        const company = await Company.find({userId});
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false,
            });
        }

        return res.status(200).json({
            message:"Company fetched successfully",
            company,
            success:true,
        })
    }

    catch(err){
        return res.status(500).json({
            message:"Failed to get company",
            success:false,
        })
    }
}

export const getCompanyById = async (req, res) => {
    try{
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false,
            });
        }

        return res.status(200).json({
            company,
            success: true,
        });
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Failed to get company",
            success:false,
        })
    }
} 

export const updateCompany = async (req, res) => {
    try{
        const {name,description,website,location} = req.body;
        const file = req.file;
        //cloudinary logic to upload image
        const fileUri = getDataUri(file);
        const cloudeResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudeResponse.secure_url;


        const updatedData = {name,description,website,location,logo};
        const company = await Company.findByIdAndUpdate(req.params.id, updatedData, {new:true});
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false,
            });
        }

        return res.status(200).json({
            message:"Company updated successfully",
            company,
            success:true,
        })
    }

    catch(err){
        return res.status(500).json({
            message:"Failed to update company",
            success:false,
        })
    }
}