import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-purple-100 text-center px-4 overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute top-10 right-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

            <h1 className="relative z-10 text-9xl font-bold text-[#6A38C2] animate-bounce drop-shadow-md">404</h1>
            <div className="flex items-center gap-2 mt-4 mb-2">
                <AlertTriangle className="text-red-500 w-8 h-8" />
                <h2 className="text-2xl font-bold text-gray-800">Page Not Found</h2>
            </div>
            <p className="text-gray-500 mb-8 max-w-md">
                Oops! The page you are looking for does not exist. It might have been moved or deleted.
            </p>
            <Button
                onClick={() => navigate('/')}
                className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white px-8 py-6 text-lg rounded-full shadow-lg transition-transform hover:scale-105"
            >
                Back to Home
            </Button>
        </div>
    );
};

export default NotFound;
