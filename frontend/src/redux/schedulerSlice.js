import { createSlice } from "@reduxjs/toolkit";

const schedulerSlice = createSlice({
  name: "scheduler",
  initialState: {
    availability: [],
    interviews: [],
    isGoogleConnected: false,
  },
  reducers: {
    setAvailability: (state, action) => {
      state.availability = action.payload;
    },
    setInterviews: (state, action) => {
      state.interviews = action.payload;
    },
    setGoogleConnection: (state, action) => {
      state.isGoogleConnected = action.payload;
    },
  },
});

export const { setAvailability, setInterviews, setGoogleConnection } = schedulerSlice.actions;
export default schedulerSlice.reducer;
