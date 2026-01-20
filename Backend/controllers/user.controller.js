import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Readable } from "stream";

export const register = async (req, res) => {
  // Registration logic here

  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Registration failed",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  // Login logic here

  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    let user = await User.findOne({ email, role });
    if (!user) {
      return res.status(400).json({
        message: "incorrect email or role",
        success: false,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "incorrect password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "role mismatch",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back, ${user.fullname}`,
        user,
        success: true,
      });
  } catch (err) {
    return res.status(500).json({
      message: "Login failed",
      success: false,
    });
  }
};


export const logout = async (req, res)=>{
   try{
    return res.status(200).cookie("token", "", {maxAge:0}) .json({
      message: "Logged out successfully",
      success: true,
    })
   }

   catch(err){
    return res.status(500).json({
      message: "Logout failed",
      success: false,
    });
   }
}


export const updateProfile = async(req, res)=>{
  try{
    const {fullname, phoneNumber, email , bio, skills} = req.body;
    const file = req.file; // from multer middleware
    //cloudinary logic comes here later...
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    



    let skillsArray;
    if(skills){
       skillsArray = skills.split(',');
    }
    
    const userId = req.id;// from auth middleware
    let user = await User.findById(userId);

    if(!user){
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Update user profile data 
    if(fullname) user.fullname = fullname;
    if(email) user.email = email;
    if(phoneNumber) user.phoneNumber = phoneNumber;
    if(bio) user.profile.bio = bio;
    if(skills) user.profile.skills = skillsArray;
 

    //resume comes later here...
    if(cloudResponse){
      user.profile.resume = cloudResponse.secure_url // save the cloudniry url
      user.profile.resumeOriginalName = file.originalname; // save the original file name
    }





    await user.save();

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
      success: true,
    });

  }

  catch(err){
    return res.status(500).json({
      message: "Profile update failed",
      success: false,
    });
  }
}
