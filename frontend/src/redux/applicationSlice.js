import {createSlice} from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name:"applications",
    initialState:{
        applications: [],
        pagination: {
            totalApplications: 0,
            totalPages: 0,
            currentPage: 1
        }
    },
    reducers:{
        setAllApplications:(state,action) => {
            state.applications = action.payload;
        },
        setPagination:(state,action) => {
            state.pagination = action.payload;
        }
    },
});

export const {setAllApplications, setPagination} = applicationSlice.actions;
export default applicationSlice.reducer;