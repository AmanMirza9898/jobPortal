import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, Sparkles, Lightbulb, Target, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const CircularProgress = ({ score, size = "large" }) => {
    const dimensions = size === "large" ? "w-32 h-32 md:w-44 md:h-44" : "w-24 h-24 md:w-32 md:h-32";
    const center = size === "large" ? 88 : 64;
    const radius = size === "large" ? 75 : 52;
    const strokeWidth = size === "large" ? 12 : 8;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className={`relative flex items-center justify-center ${dimensions}`}>
            <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${center * 2} ${center * 2}`}>
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="text-gray-100 dark:text-neutral-800"
                />
                <motion.circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: circumference - (circumference * score) / 100 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    strokeLinecap="round"
                    className="text-purple-600 dark:text-purple-400"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white"
                >
                    {score}
                </motion.span>
                <span className="text-[10px] md:text-xs uppercase text-gray-400 dark:text-neutral-500 font-bold tracking-tighter md:tracking-widest">Score</span>
            </div>
        </div>
    );
};

const ResumeScorer = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            if (selectedFile.size > 1024 * 1024) {
                toast.error("File size exceeds 1MB");
                return;
            }
            setFile(selectedFile);
            setResult(null);
        } else {
            toast.error("Please select a valid PDF file");
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a file first");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("/api/ai/score-resume", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });

            if (res.data.success) {
                setResult(res.data.data);
                toast.success("Resume analyzed successfully!");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong during analysis");
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 10 },
        visible: { opacity: 1, scale: 1, y: 0 }
    };

    return (
        <div className="relative w-full overflow-hidden bg-neutral-50/50 dark:bg-neutral-950/20 py-8 md:py-16">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/40 dark:bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/40 dark:bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto px-5 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10 md:mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200/50 dark:border-purple-800/30">
                        <Sparkles size={14} />
                        Powered by Gemini AI 2.5
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight dark:text-white">
                        AI Resume <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Insight</span> Scorer
                    </h1>
                    <p className="text-base md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                        Elevate your career with instant expert feedback. Our Recruiter AI simulates a 20-year veteran's perspective to score your profile.
                    </p>
                </motion.div>

                <div className={`grid ${result ? 'lg:grid-cols-12' : 'grid-cols-1 max-w-2xl mx-auto'} gap-8 items-start`}>
                    {/* Left: Upload Section */}
                    <motion.div
                        layout
                        className={`${result ? 'lg:col-span-5' : 'w-full'} p-2 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]`}
                    >
                        <div className="p-4 md:p-6">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white">
                                <FileText className="text-purple-600" size={24} />
                                Document Upload
                            </h2>
                            <div className="relative group">
                                <div className="flex flex-col items-center justify-center p-8 md:p-14 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl bg-neutral-50/50 dark:bg-neutral-950/20 group-hover:border-purple-400 dark:group-hover:border-purple-600 transition-all cursor-pointer">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 transition-all">
                                        <Upload className="text-neutral-400 group-hover:text-purple-600" size={28} />
                                    </div>
                                    <p className="text-base font-bold text-neutral-700 dark:text-neutral-200 text-center">
                                        {file ? file.name : "Click to select or drag PDF"}
                                    </p>
                                    <p className="text-xs text-neutral-400 mt-3 font-medium">PDF formats only • Max 1MB</p>
                                </div>
                            </div>

                            <button
                                onClick={handleUpload}
                                disabled={loading || !file}
                                className="w-full mt-6 py-4 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-black text-lg flex items-center justify-center gap-3 hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 transition-all shadow-xl dark:shadow-white/5"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={24} />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Scan Profile
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* Right: Results Section */}
                    <AnimatePresence>
                        {result && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="lg:col-span-12 space-y-8"
                            >
                                {/* Results Wrapper */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                                    {/* Score Card */}
                                    <motion.div
                                        variants={itemVariants}
                                        className="lg:col-span-4 p-5 md:p-10 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center text-center shadow-sm w-full box-border"
                                    >
                                        <CircularProgress score={result.score} />
                                        <div className="mt-8">
                                            <div className="text-sm font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1">Status</div>
                                            <div className="text-2xl font-black text-neutral-900 dark:text-white">
                                                {result.score >= 80 ? "Excellence" : result.score >= 60 ? "Solid Base" : "Needs Polish"}
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Summary Card */}
                                    <motion.div
                                        variants={itemVariants}
                                        className="lg:col-span-8 p-5 md:p-10 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm relative overflow-hidden w-full box-border"
                                    >
                                        <div className="absolute top-0 right-0 p-4">
                                            <CheckCircle2 className="text-green-500" size={32} />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white mb-6">Expert Verdict</h3>
                                        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
                                            {result.summary}
                                        </p>
                                    </motion.div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Tips Card */}
                                    <motion.div
                                        variants={itemVariants}
                                        className="p-6 md:p-10 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm w-full box-border"
                                    >
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                                <Lightbulb size={24} />
                                            </div>
                                            <h4 className="text-xl font-black dark:text-white">Professional Tips</h4>
                                        </div>
                                        <ul className="space-y-4">
                                            {result.tips.map((tip, i) => (
                                                <li key={i} className="flex items-start gap-4 group">
                                                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2.5 group-hover:scale-150 transition-transform" />
                                                    <p className="flex-1 text-base text-neutral-600 dark:text-neutral-400 font-medium">{tip}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>

                                    {/* Skills Card */}
                                    <motion.div
                                        variants={itemVariants}
                                        className="p-8 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm"
                                    >
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                <Target size={24} />
                                            </div>
                                            <h4 className="text-xl font-black dark:text-white">Skills to Acquire</h4>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {result.missing_skills.map((skill, i) => (
                                                <span key={i} className="px-5 py-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-2xl text-sm font-bold text-neutral-700 dark:text-neutral-300 transition-colors cursor-default">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ResumeScorer;
