import React, { useEffect, useState } from 'react'
import ApplicantsTable from './ApplicantsTable'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplications } from '@/redux/applicationSlice'
import { Search, Loader2 } from 'lucide-react'

const AllApplicants = () => {
    const dispatch = useDispatch();
    const { applications } = useSelector((store) => store.application);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${APPLICATION_API_END_POINT}/recruiter/applicants`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllApplications(res.data.applications));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchAllApplicants();
    }, [dispatch]);

    const filteredApplications = applications?.filter(app => 
        app.applicant?.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.job?.company?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-2">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">All Applicants</h1>
                    <p className="text-gray-500 font-medium mt-1">Manage all candidates across your posted jobs.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, job or company..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/10 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
                    />
                </div>
            </div>

            {
                loading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
                    </div>
                ) : (
                    <ApplicantsTable applications={filteredApplications} />
                )
            }
        </div>
    )
}

export default AllApplicants;
