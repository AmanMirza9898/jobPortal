import React, { useState, useEffect } from "react";
import { SCHEDULER_API_END_POINT } from "@/utils/constant";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { setGoogleConnection, setAvailability } from "../../redux/schedulerSlice";
import { setUser } from "../../redux/authSlice";
import { Loader2, Calendar, CheckCircle2, AlertCircle } from "lucide-react";

const AvailabilitySettings = () => {
  const [loading, setLoading] = useState(false);
  const [day, setDay] = useState("Monday");
  const [slots, setSlots] = useState([{ startTime: "10:00", endTime: "11:00" }]);
  const { isGoogleConnected, availability } = useSelector((store) => store.scheduler);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Handle Google OAuth callback redirect
  useEffect(() => {
    const connected = searchParams.get("connected");
    const error = searchParams.get("error");
    if (connected === "true") {
      dispatch(setGoogleConnection(true));
      dispatch(setUser({ ...user, isGoogleConnected: true }));
      toast.success("Google Calendar connected successfully! 🎉");
      setSearchParams({}); // clean URL
    } else if (error) {
      toast.error("Failed to connect Google Calendar. Please try again.");
      setSearchParams({}); // clean URL
    }
  }, [searchParams]);

  const connectGoogle = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${SCHEDULER_API_END_POINT}/auth-url`, { withCredentials: true });
      if (res.data.success) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to connect Google Calendar");
    } finally {
      setLoading(false);
    }
  };

  const addSlot = () => {
    setSlots([...slots, { startTime: "", endTime: "" }]);
  };

  const updateSlot = (index, field, value) => {
    const updatedSlots = [...slots];
    updatedSlots[index][field] = value;
    setSlots(updatedSlots);
  };

  const removeSlot = (index) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const saveAvailability = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${SCHEDULER_API_END_POINT}/availability`,
        { day, slots },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Availability saved successfully");
        dispatch(setAvailability(res.data.availability));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save availability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto my-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Calendar className="text-purple-600" /> Interview Scheduler Settings
        </h1>

        {/* Google Calendar Connection */}
        <div className="mb-10 p-4 border rounded-lg bg-gray-50 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Google Calendar Integration</h2>
            <p className="text-sm text-gray-600">Connect your calendar to automatically create Google Meet links.</p>
          </div>
          {user?.isGoogleConnected ? (
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle2 size={20} /> Connected
            </div>
          ) : (
            <button
              onClick={connectGoogle}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-all flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Connect Google Calendar"}
            </button>
          )}
        </div>

        {/* Availability Settings */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Set Weekly Availability</h2>
          <div className="flex items-center gap-4 mb-4">
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="border p-2 rounded-md outline-none bg-white"
            >
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {slots.map((slot, index) => (
              <div key={index} className="flex items-center gap-4 animate-in fade-in slide-in-from-left-2 transition-all">
                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) => updateSlot(index, "startTime", e.target.value)}
                  className="border p-2 rounded-md outline-none"
                />
                <span>to</span>
                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) => updateSlot(index, "endTime", e.target.value)}
                  className="border p-2 rounded-md outline-none"
                />
                <button
                  onClick={() => removeSlot(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={addSlot}
              className="text-purple-600 hover:text-purple-700 font-medium border border-purple-600 px-4 py-2 rounded-md"
            >
              + Add Slot
            </button>
            <button
              onClick={saveAvailability}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" />} Save Availability
            </button>
          </div>
        </div>

        {!user?.isGoogleConnected && (
          <div className="mt-10 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-yellow-600 mt-1" size={20} />
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> You must connect your Google Calendar to generate meeting links. Without it, you can
              still set availability, but you'll have to provide meeting links manually.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailabilitySettings;
