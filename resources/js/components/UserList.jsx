import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
    const [usersByRole, setUsersByRole] = useState([]);
    
    useEffect(() => {
        axios.get('/api/users')
            .then(response => {
                setUsersByRole(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);
    
    return (
        <div>
            <div className="bg-white shadow-xl rounded-lg border border-gray-100 mb-8">
                <div className="bg-navy-900 text-white px-8 py-6 rounded-t-lg">
                    <h2 className="text-3xl font-bold flex items-center">
                        <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Users by Role
                    </h2>
                    <p className="text-navy-200 mt-2">View all users organized by their assigned roles</p>
                </div>
            </div>
            
            {Array.isArray(usersByRole) && usersByRole.length > 0 ? (
                <div className="space-y-6">
                    {usersByRole.map(role => (
                        <div key={role.id} className="bg-white shadow-lg rounded-lg border border-gray-100 overflow-hidden">
                            <div className="bg-navy-800 text-white px-6 py-4">
                                <h3 className="text-xl font-semibold flex items-center">
                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    {role.name}
                                </h3>
                                <p className="text-navy-200 text-sm mt-1">
                                    {role.users && role.users.length > 0 
                                        ? `${role.users.length} user${role.users.length > 1 ? 's' : ''} assigned`
                                        : 'No users assigned'
                                    }
                                </p>
                            </div>
                            
                            {role.users && role.users.length > 0 ? (
                                <div className="divide-y divide-gray-200">
                                    {role.users.map(user => (
                                        <div key={user.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <div className="h-10 w-10 bg-navy-100 rounded-full flex items-center justify-center">
                                                            <svg className="h-6 w-6 text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <p className="text-lg font-semibold text-navy-900">
                                                            {user.name}
                                                        </p>
                                                        <p className="text-sm text-gray-600 flex items-center">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 9M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                            </svg>
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-navy-100 text-navy-800">
                                                        Active
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-6 py-8 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <p className="text-gray-500 mt-2">No users assigned to this role</p>
                                    <p className="text-gray-400 text-sm">Assign users to see them here</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white shadow-lg rounded-lg border border-gray-100 p-8 text-center">
                    <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                    <p className="text-gray-500">Get started by creating some users and roles</p>
                </div>
            )}
        </div>
    );
}

export default UserList;