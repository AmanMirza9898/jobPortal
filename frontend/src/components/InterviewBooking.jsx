import React, { useState, useEffect } from "react";
import Navbar from "./shared/Navbar";
import { SCHEDULER_API_END_POINT } from "@/utils/constant";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Calendar, Clock, Video, CheckCircle2 } from "lucide-react";

const InterviewBooking = () => {
  const { recruiterId, applicationId } = useParams();
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${SCHEDULER_API_END_POINT}/availability/${recruiterId}`);
        if (res.data.success) {
          setAvailability(res.data.availability);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch recruiter availability");
      } finally {
        setLoading(false);
      }
    };
    fetchAvailability();
  }, [recruiterId]);

  const bookInterview = async () => {
    if (!selectedSlot) return toast.error("Please select a slot");

    try {
      setLoading(true);
      const res = await axios.post(
        `${SCHEDULER_API_END_POINT}/schedule`,
        {
          applicationId,
          startTime: `${selectedSlot.day}T${selectedSlot.startTime}`,
          endTime: `${selectedSlot.day}T${selectedSlot.endTime}`,
          slotId: selectedSlot.slotId,
          availabilityId: selectedSlot.availabilityId,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Interview scheduled successfully!");
        setIsBooked(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <CheckCircle2 size={64} className="text-green-500 mb-6 animate-bounce" />
        <h1 className="text-3xl font-bold mb-2">Interview Scheduled!</h1>
        <p className="text-gray-600 text-center mb-8">
          A confirmation email with the meeting link has been sent to your email.
        </p>
        <button
          onClick={() => navigate("/profile")}
          className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition"
        >
          Go to My Profile
        </button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule Your Interview</h1>
          <p className="text-gray-600">Pick a time slot that works best for you.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-purple-600" size={48} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calendar View (Simplified) */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Calendar size={20} className="text-purple-600" /> Available Days
              </h2>
              <div className="flex flex-wrap gap-3">
                {availability.map((item) => (
                  <button
                    key={item._id}
                    className="px-4 py-2 border rounded-full hover:bg-purple-50 hover:border-purple-300 transition-colors bg-white shadow-sm"
                  >
                    {item.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Slots View */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Clock size={20} className="text-purple-600" /> Select a Time
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {availability.flatMap((dayData) =>
                  dayData.slots
                    .filter((s) => !s.isBooked)
                    .map((slot) => (
                      <button
                        key={slot._id}
                        onClick={() =>
                          setSelectedSlot({
                            ...slot,
                            day: dayData.day,
                            availabilityId: dayData._id,
                            slotId: slot._id,
                          })
                        }
                        className={`p-3 border rounded-xl text-sm font-medium transition-all ${
                          selectedSlot?.slotId === slot._id
                            ? "bg-purple-600 text-white border-purple-600 scale-105"
                            : "bg-gray-50 text-gray-700 hover:border-purple-300"
                        }`}
                      >
                        {slot.startTime} - {slot.endTime}
                      </button>
                    ))
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 pt-8 border-t flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Video size={16} /> Interview will be held on Google Meet
          </div>
          <button
            onClick={bookInterview}
            disabled={!selectedSlot || loading}
            className="w-full md:w-auto bg-purple-600 text-white px-12 py-4 rounded-full font-bold shadow-lg shadow-purple-200 hover:bg-purple-700 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" />} Confirm Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewBooking;
