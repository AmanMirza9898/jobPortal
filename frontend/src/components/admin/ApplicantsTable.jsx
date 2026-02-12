import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, CheckCircle2, XCircle, AlertCircle, PartyPopper } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { setAllApplications } from '@/redux/applicationSlice';
import axios from 'axios';
import { toast } from 'sonner';


const shortlistingStatus = ["Accepted", "Rejected"];


const ApplicantsTable = () => {
    const { applications } = useSelector((store) => store.application);
    const dispatch = useDispatch();
    const [openReject, setOpenReject] = React.useState(false);
    const [openAccept, setOpenAccept] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const statusHandler = async (id, status) => {
        if (status === "Rejected") {
            setSelectedItem({ id, status });
            setOpenReject(true);
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true });
            if (res.data.success) {
                // Update Redux state immediately
                const updatedApplications = applications.map(app =>
                    app._id === id ? { ...app, status } : app
                );
                dispatch(setAllApplications(updatedApplications));

                toast.success(res.data.message);
                if (status === "Accepted") {
                    setOpenAccept(true);
                }
            }
        }
        catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    const confirmReject = async () => {
        if (!selectedItem) return;
        try {
            setLoading(true);
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${selectedItem.id}/update`, { status: selectedItem.status }, { withCredentials: true });
            if (res.data.success) {
                // Update Redux state immediately
                const updatedApplications = applications.map(app =>
                    app._id === selectedItem.id ? { ...app, status: selectedItem.status } : app
                );
                dispatch(setAllApplications(updatedApplications));

                toast.success(res.data.message);
                setOpenReject(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
            setSelectedItem(null);
        }
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-lg p-6">
            <Table className="border-separate border-spacing-y-2">
                <TableCaption className="text-gray-500 font-medium mb-4">A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow className="border-none hover:bg-transparent">
                        <TableHead className="w-[200px] pl-6 font-bold text-gray-700 dark:text-gray-300">Full Name</TableHead>
                        <TableHead className="font-bold text-gray-700 dark:text-gray-300">Email</TableHead>
                        <TableHead className="font-bold text-gray-700 dark:text-gray-300">Contact</TableHead>
                        <TableHead className="font-bold text-gray-700 dark:text-gray-300">Resume</TableHead>
                        <TableHead className="font-bold text-gray-700 dark:text-gray-300">Date</TableHead>
                        <TableHead className="font-bold text-gray-700 dark:text-gray-300">Status</TableHead>
                        <TableHead className="text-right pr-6 font-bold text-gray-700 dark:text-gray-300">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applications && applications.map((item) => (
                            <TableRow key={item._id} className="bg-white/60 dark:bg-neutral-900/60 hover:bg-white/80 dark:hover:bg-neutral-800 transition-colors rounded-xl shadow-sm border-none group">
                                <TableCell className="pl-6 py-4 first:rounded-l-xl font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#6A38C2] dark:group-hover:text-[#a04ee0] transition-colors">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="text-gray-600 dark:text-gray-400">{item?.applicant?.email}</TableCell>
                                <TableCell className="text-gray-600 dark:text-gray-400">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell className="text-blue-600 dark:text-blue-400">
                                    {
                                        item.applicant?.profile?.resume ? <a className="hover:underline cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span className="text-gray-500">NA</span>
                                    }
                                </TableCell>
                                <TableCell className="text-gray-500 dark:text-gray-500 text-sm">{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={item?.status}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Badge className={`${item?.status?.toLowerCase() === "rejected" ? 'bg-red-500/10 text-red-600 border-red-200' : item?.status?.toLowerCase() === 'accepted' ? 'bg-green-500/10 text-green-600 border-green-200' : 'bg-gray-500/10 text-gray-600 border-gray-200'} font-bold px-3 py-1 rounded-full border flex items-center gap-1 w-fit`}>
                                                {item?.status?.toLowerCase() === "accepted" && <CheckCircle2 className="w-3 h-3" />}
                                                {item?.status?.toLowerCase() === "rejected" && <XCircle className="w-3 h-3" />}
                                                <span>{item?.status?.toUpperCase() || "PENDING"}</span>
                                            </Badge>
                                        </motion.div>
                                    </AnimatePresence>
                                </TableCell>
                                <TableCell className="text-right pr-6 last:rounded-r-xl">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 cursor-pointer transition-colors" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 p-0 border-gray-100 dark:border-gray-700 shadow-xl rounded-xl mr-6 bg-white dark:bg-[#1A1A1A] overflow-hidden">
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(item._id, status)} key={index} className='flex w-full items-center px-4 py-3 cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-[#6A38C2] dark:hover:text-[#a04ee0] transition-colors text-sm font-medium text-gray-700 dark:text-gray-300'>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

            {/* Reject Confirmation Dialog */}
            <Dialog open={openReject} onOpenChange={setOpenReject}>
                <DialogContent className="sm:max-w-[425px] rounded-2xl border-none bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-2xl p-0 overflow-hidden">
                    <div className="h-2 bg-red-500 w-full" />
                    <div className="p-8 pb-6">
                        <DialogHeader>
                            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                                <AlertCircle className="w-8 h-8 text-red-600" />
                            </div>
                            <DialogTitle className="text-2xl font-bold text-center text-gray-900 dark:text-zinc-100">
                                Confirm Rejection
                            </DialogTitle>
                            <DialogDescription className="text-center text-gray-500 dark:text-zinc-400 mt-2">
                                Are you sure you want to reject this applicant? This action will notify the candidate.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-8 flex flex-col sm:flex-row gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setOpenReject(false)}
                                className="flex-1 rounded-xl border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all font-semibold"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={confirmReject}
                                disabled={loading}
                                className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20 transition-all font-semibold"
                            >
                                {loading ? "Rejecting..." : "Reject Now"}
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Accept Success Dialog */}
            <AnimatePresence>
                {openAccept && (
                    <Dialog open={openAccept} onOpenChange={setOpenAccept}>
                        <DialogContent className="sm:max-w-[425px] border-none bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl shadow-3xl p-0 overflow-hidden rounded-4xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
                                <div className="p-10 text-center">
                                    <motion.div
                                        initial={{ rotate: -10, scale: 0 }}
                                        animate={{ rotate: 0, scale: 1 }}
                                        transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
                                        className="mx-auto w-24 h-24 bg-linear-to-tr from-[#6A38C2] to-[#a04ee0] rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-purple-500/20"
                                    >
                                        <PartyPopper className="w-12 h-12 text-white" />
                                    </motion.div>

                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-3xl font-extrabold text-gray-900 dark:text-zinc-100 mb-3"
                                    >
                                        Incredible!
                                    </motion.h2>

                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-lg text-gray-600 dark:text-zinc-400 font-medium leading-relaxed mb-8"
                                    >
                                        The applicant has been successfully accepted. Get ready to welcome a new talent!
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <Button
                                            onClick={() => setOpenAccept(false)}
                                            className="w-full py-6 rounded-2xl bg-[#6A38C2] hover:bg-[#5a2fb0] text-white text-lg font-bold shadow-2xl shadow-purple-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            Awesome!
                                        </Button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </DialogContent>
                    </Dialog>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ApplicantsTable;
