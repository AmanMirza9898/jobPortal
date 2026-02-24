import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import { Readable } from "stream"; // Stream import zaroori hai
import getDataUri from "../utils/datauri.js";
import crypto from "crypto";
import sendEmail from "../utils/email.js";
import disposableDomains from "disposable-email-domains" with { type: "json" };

// --- Helper for Cloudinary Deletion ---
const deleteFromCloudinary = async (url) => {
    if (!url) return;
    try {
        const parts = url.split('/');
        const uploadIndex = parts.indexOf('upload');
        if (uploadIndex !== -1) {
            const resourceType = parts[uploadIndex - 1]; // 'image', 'video', or 'raw'
            // Old URLs might not have a version, but usually they do. 
            // Most robust: get everything after 'v<digits>' or after 'upload' if no 'v'
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

// --- REGISTER ---
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // --- 1. Temp Mail Check ---
        const domain = email.split('@')[1];
        if (disposableDomains.includes(domain)) {
            return res.status(400).json({ 
                message: "Aapka email address register karne ke liye valid nahi hai. Please ek permanent email (jaise Gmail, Yahoo) use karein.", 
                success: false 
            });
        }

        const file = req.file;
        let cloudResponse;

        if (file) {
            const fileUrl = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUrl.content);
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // --- 2. Generate Verification Token ---
        const verificationToken = crypto.randomBytes(20).toString("hex");
        const verificationTokenExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

        const user = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse ? cloudResponse.secure_url : ""
            },
            verificationToken,
            verificationTokenExpire
        });

        // --- 3. Send Verification Email ---
        const verificationUrl = `http://localhost:5173/verify-email/${verificationToken}`;
        const message = `Bhai, aapka JobSync account register ho gaya hai. Account activate karne ke liye niche diye gaye link par click karein:\n\n${verificationUrl}\n\nYe link 24 ghante tak valid rahega.`;

        try {
            await sendEmail({
                email: user.email,
                subject: "Account Verification - JobSync",
                message,
            });

            return res.status(201).json({ 
                message: "Registration successful! Please check your email to verify your account.", 
                success: true 
            });
        } catch (emailErr) {
            console.error("Verification email failed:", emailErr);
            return res.status(201).json({ 
                message: "User registered, but verification email could not be sent. Please contact support.", 
                success: true 
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Registration failed", success: false });
    }
};

// --- LOGIN ---
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        let user = await User.findOne({ email, role });
        if (!user) {
            return res.status(400).json({ message: "Incorrect email or role", success: false });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Incorrect password", success: false });
        }
        if (role !== user.role) {
            return res.status(400).json({ message: "Role mismatch", success: false });
        }

        // --- Check Verification ---
        if (!user.isVerified) {
            return res.status(401).json({ 
                message: "Aapka account abhi verified nahi hai. Please apna email check karein aur link par click karke activate karein.", 
                success: false 
            });
        }
        const tokenData = { userId: user._id };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).json({
            message: `Welcome back, ${user.fullname}`,
            user,
            success: true,
        });
    } catch (err) {
        return res.status(500).json({ message: "Login failed", success: false });
    }
};

// --- LOGOUT ---

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {
            maxAge: 0,
            httpOnly: true,    // Added (Must match Login)
            sameSite: "strict" // Added (Must match Login)
        }).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (err) {
        return res.status(500).json({ message: "Logout failed", success: false });
    }
};

// --- UPDATE PROFILE (FIXED FOR PDF) ---
// --- UPDATE PROFILE (OPTIMIZED) ---
export const updateProfile = async (req, res) => {
    try {
        const { fullname, phoneNumber, email, bio, skills } = req.body;
        console.log("Update Profile Body:", req.body); // Debug Log

        const files = req.files;
        const userId = req.id; // Ensure authentication middleware sets this

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // --- 1. CLOUDINARY UPLOADS (STREAM) ---

        // --- Handle Resume ---
        let resumeResponse;
        if (files && files.file) {
            const resumeFile = files.file[0];
            const stream = Readable.from(resumeFile.buffer);
            resumeResponse = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: "auto", folder: "resumes" },
                    (error, result) => { if (error) reject(error); else resolve(result); }
                );
                stream.pipe(uploadStream);
            });

            // Delete old resume if it exists on Cloudinary
            if (user.profile.resume) {
                await deleteFromCloudinary(user.profile.resume);
            }
        }

        // --- Handle Profile Photo ---
        let photoResponse;
        if (files && files.profilePhoto) {
            const photoFile = files.profilePhoto[0];
            const stream = Readable.from(photoFile.buffer);
            photoResponse = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: "image", folder: "avatars" },
                    (error, result) => { if (error) reject(error); else resolve(result); }
                );
                stream.pipe(uploadStream);
            });

            // Delete old profile photo if it exists on Cloudinary
            if (user.profile.profilePhoto) {
                await deleteFromCloudinary(user.profile.profilePhoto);
            }
        }

        // --- 2. UPDATE FIELDS ---
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;

        // Profile object ensure karo taaki crash na ho
        if (!user.profile) user.profile = {};

        // Bio logic fix:
        // Agar bio aa raha hai (chahe empty string ho ya text), use update karo
        if (bio !== undefined) user.profile.bio = bio;

        if (skills) {
            user.profile.skills = skills.split(',').map(skill => skill.trim());
        }

        // --- 3. SAVE URLS ---
        if (resumeResponse) {
            user.profile.resume = resumeResponse.secure_url;
            user.profile.resumeOriginalName = files.file[0].originalname;
        }

        if (photoResponse) {
            user.profile.profilePhoto = photoResponse.secure_url;
        }

        await user.save();

        // Return updated user object
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Profile update failed", success: false });
    }
};

// --- FORGOT PASSWORD ---
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found with this email", success: false });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");

        // Hash and set to user model
        user.resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // Set expire (10 mins)
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        // Create reset URL
        const resetUrl = `http://localhost:5000/reset-password/${resetToken}`;

        const message = `Bhai, aapka password reset karne ka link ye raha. Ye link sirf 10 minute tak valid rahega:\n\n${resetUrl}\n\nAgar aapne ye request nahi ki hai, toh please ise ignore karein.`;

        try {
            await sendEmail({
                email: user.email,
                subject: "Password Reset Request - JobSync",
                message,
            });

            res.status(200).json({ message: `Email sent to ${user.email}`, success: true });
        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            return res.status(500).json({ message: "Email could not be sent", success: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// --- RESET PASSWORD ---
export const resetPassword = async (req, res) => {
    try {
        // Hash token from params
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token", success: false });
        }

        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ message: "Password is required", success: false });
        }

        // Hash new password
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ message: "Password reset successfully", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// --- VERIFY EMAIL ---
export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification token", success: false });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpire = undefined;

        await user.save();

        res.status(200).json({ message: "Account verified successfully! You can now login.", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Verification failed", success: false });
    }
};