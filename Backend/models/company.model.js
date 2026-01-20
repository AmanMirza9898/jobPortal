import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    requirements: [{
      type: String
    }],
      website: {
      type: String,
    },
      Location: {
      type: String,
    },
    logo: {
      type: String, //URL to the company logo image
    },

    UserId: {
     type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        // required: true
    },
    
  },
  { timestamps: true }
);

export const Company = mongoose.model("Company", companySchema);

   
