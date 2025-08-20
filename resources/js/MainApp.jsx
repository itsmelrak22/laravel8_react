import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import RoleForm from './components/RoleForm';
import RoleList from './components/RoleList';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-white">
                {/* Header */}
                <header className="bg-navy-900 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-center h-20">
                            <div className="flex items-center">
                                <h1 className="text-2xl font-bold text-white">
                                    User Management System
                                </h1>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Navigation */}
                <nav className="bg-navy-800 border-b border-navy-700">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex space-x-1">
                            <Link 
                                to="/" 
                                className="text-white hover:bg-navy-700 hover:text-navy-100 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out flex items-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add User
                            </Link>
                            <Link 
                                to="/users" 
                                className="text-white hover:bg-navy-700 hover:text-navy-100 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out flex items-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                View Users
                            </Link>
                            <Link 
                                to="/add-role" 
                                className="text-white hover:bg-navy-700 hover:text-navy-100 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out flex items-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Add Role
                            </Link>
                            <Link 
                                to="/roles" 
                                className="text-white hover:bg-navy-700 hover:text-navy-100 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out flex items-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Manage Roles
                            </Link>
                        </div>
                    </div>
                </nav>

                <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <Routes>
                        <Route path="/" element={<UserForm />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/add-role" element={<RoleForm />} />
                        <Route path="/roles" element={<RoleList />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
