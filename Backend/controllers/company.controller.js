import { Company } from "../models/company.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import { Readable } from "stream"; // Stream import zaroori hai
import getDataUri from "../utils/datauri.js";

// --- Helper for Cloudinary Deletion ---
const deleteFromCloudinary = async (url) => {
    if (!url) return;
    try {
        const parts = url.split('/');
        const uploadIndex = parts.indexOf('upload');
        if (uploadIndex !== -1) {
            const resourceType = parts[uploadIndex - 1]; // 'image', 'video', or 'raw'
            let publicIdWithExt;
            let possibleVersion = parts[uploadIndex + 1];
            if (possibleVersion.startsWith('v') && !isNaN(possibleVersion.substring(1))) {
                publicIdWithExt = parts.slice(uploadIndex + 2).join('/');
            } else {
                publicIdWithExt = parts.slice(uploadIndex + 1).join('/');
            }
            const publicId = publicIdWithExt.split('.')[0];
            await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
            console.log(`Deleted from Cloudinary: ${publicId} (${resourceType})`);
        }
    } catch (err) {
        console.error("Cloudinary deletion failed:", err);
    }
};

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company already registered you cant regestier same company",
                success: false,
            });
        }

        company = await Company.create({
            name: companyName,
            UserId: req.userId,
        })

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true,

        })

    }
    catch (err) {
        return res.status(500).json({
            message: "Company registration failed",
            success: false,
        })
    }
}


export const getCompany = async (req, res) => {

    try {
        const userId = req.userId;
        const company = await Company.find({ userId });
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company fetched successfully",
            company,
            success: true,
        })
    }

    catch (err) {
        return res.status(500).json({
            message: "Failed to get company",
            success: false,
        })
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        return res.status(200).json({
            company,
            success: true,
        });
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to get company",
            success: false,
        })
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        const companyId = req.params.id;
        const existingCompany = await Company.findById(companyId);
        if (!existingCompany) {
            return res.status(404).json({ message: "Company not found", success: false });
        }

        let logo;
        if (file) {
            const fileUri = getDataUri(file);
            const cloudeResponse = await cloudinary.uploader.upload(fileUri.content, {
                folder: "companies"
            });
            logo = cloudeResponse.secure_url;

            // Delete old logo from Cloudinary
            if (existingCompany.logo) {
                await deleteFromCloudinary(existingCompany.logo);
            }
        }


        const updatedData = { name, description, website, location };
        if (logo) updatedData.logo = logo;

        const company = await Company.findByIdAndUpdate(companyId, updatedData, { new: true });
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company updated successfully",
            company,
            success: true,
        })
    }

    catch (err) {
        return res.status(500).json({
            message: "Failed to update company",
            success: false,
        })
    }
}

export const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        // Delete logo from Cloudinary
        if (company.logo) {
            await deleteFromCloudinary(company.logo);
        }

        await Company.findByIdAndDelete(companyId);

        return res.status(200).json({
            message: "Company deleted successfully",
            success: true,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to delete company",
            success: false,
        });
    }
}