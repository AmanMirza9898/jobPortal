import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState:{
        singleCompany: null,
        companies:[],
        searchCompanyByText:"",
        pagination: {
            totalCompanies: 0,
            totalPages: 0,
            currentPage: 1
        }
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setCompanies:(state,action)=>{
            state.companies = action.payload;
        },
        setSearchCompanyByText:(state,action)=>{
            state.searchCompanyByText = action.payload;
        },
        setCompanyPagination:(state,action)=>{
            state.pagination = action.payload;
        }
    },
});

export const { setSingleCompany,setCompanies,setSearchCompanyByText, setCompanyPagination } = companySlice.actions;
export default companySlice.reducer;