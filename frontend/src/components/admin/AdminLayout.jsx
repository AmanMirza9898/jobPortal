import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { ModeToggle } from '../ModeToggle';

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50/50 dark:bg-[#020817]">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-grow lg:ml-64 p-4 md:p-8 pt-20 lg:pt-10 transition-all duration-300">
                {/* Top Header Bar for Dashboard */}
                <div className="flex justify-end items-center mb-8 gap-4">
                    <ModeToggle />
                </div>
                
                {/* Nested Routes Render Here */}
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
