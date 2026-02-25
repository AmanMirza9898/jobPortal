import React, { useEffect, useState } from 'react'
import ApplicantsTable from './ApplicantsTable'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplications, setPagination } from '@/redux/applicationSlice'
import { Search, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'

const AllApplicants = () => {
    const dispatch = useDispatch();
    const { applications, pagination } = useSelector((store) => store.application);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${APPLICATION_API_END_POINT}/recruiter/applicants?page=${page}&limit=10`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllApplications(res.data.applications));
                    dispatch(setPagination({
                        totalApplications: res.data.totalApplications,
                        totalPages: res.data.totalPages,
                        currentPage: res.data.currentPage
                    }));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchAllApplicants();
    }, [dispatch, page]);

    const filteredApplications = applications?.filter(app => 
        app.applicant?.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.job?.company?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto p-4 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-2">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">All Applicants</h1>
                    <p className="text-gray-500 font-medium mt-1">Manage all candidates across your posted jobs.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search current page..."
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
                    <div className="space-y-6">
                        <ApplicantsTable applications={filteredApplications} />
                        
                        {/* Pagination Controls */}
                        <div className="flex items-center justify-between bg-white dark:bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                            <div className="text-sm text-gray-500 font-medium">
                                Showing <span className="text-gray-900 dark:text-white">{(page - 1) * 10 + 1}</span> to <span className="text-gray-900 dark:text-white">{Math.min(page * 10, pagination.totalApplications)}</span> of <span className="text-gray-900 dark:text-white">{pagination.totalApplications}</span> applicants
                            </div>
                            <div className="flex items-center gap-2">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    className="rounded-xl border-gray-200 dark:border-white/10"
                                >
                                    <ChevronLeft size={16} className="mr-1" /> Previous
                                </Button>
                                <div className="flex items-center gap-1">
                                    {[...Array(pagination.totalPages)].map((_, i) => (
                                        <Button
                                            key={i}
                                            variant={page === i + 1 ? "default" : "ghost"}
                                            size="sm"
                                            onClick={() => setPage(i + 1)}
                                            className={`w-10 h-10 rounded-xl font-bold ${page === i + 1 ? 'bg-purple-600 hover:bg-purple-700 text-white' : ''}`}
                                        >
                                            {i + 1}
                                        </Button>
                                    ))}
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => setPage(prev => Math.min(prev + 1, pagination.totalPages))}
                                    disabled={page === pagination.totalPages || pagination.totalPages === 0}
                                    className="rounded-xl border-gray-200 dark:border-white/10"
                                >
                                    Next <ChevronRight size={16} className="ml-1" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AllApplicants;
