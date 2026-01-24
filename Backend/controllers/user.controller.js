import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import { Readable } from "stream"; // Stream import zaroori hai
import getDataUri from "../utils/datauri.js";
// --- REGISTER ---
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
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

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse ? cloudResponse.secure_url : ""
            }
        });

        return res.status(201).json({ message: "User registered successfully", success: true });
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

        const file = req.file;
        const userId = req.id; // Ensure authentication middleware sets this

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // --- 1. CLOUDINARY UPLOAD (STREAM) ---
        let cloudResponse;
        if (file) {
            // Convert buffer to readable stream
            const stream = Readable.from(file.buffer);

            cloudResponse = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "auto", // Works best for mixed file types (PDF/Images)
                        folder: "resumes",
                    },
                    (error, result) => {
                        if (error) {
                            console.error("Cloudinary Upload Error:", error);
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                // Pipe the file data to Cloudinary
                stream.pipe(uploadStream);
            });
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

        // --- 3. SAVE RESUME URL ---
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url; // This will now be a valid public URL
            user.profile.resumeOriginalName = file.originalname;
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