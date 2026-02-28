import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    day: {
      type: String, // e.g., 'Monday', '2026-03-01'
      required: true,
    },
    slots: [
      {
        startTime: { type: String, required: true }, // e.g., '10:00'
        endTime: { type: String, required: true },   // e.g., '11:00'
        isBooked: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const Availability = mongoose.model("Availability", availabilitySchema);
export default Availability;
