import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
    name: 'job',
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: '',
        allAppliedJobs: [],
        searchedQuery: "",
        loading: false,
        adminPagination: {
            totalJobs: 0,
            totalPages: 0,
            currentPage: 1
        }
    },

    reducers: {
        //actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAdminPagination: (state, action) => {
            state.adminPagination = action.payload;
        }
    }
})

export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByText, setAllAppliedJobs, setSearchedQuery, setLoading, setAdminPagination } = jobSlice.actions;
export default jobSlice.reducer; 