import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RoleList() {
    const [roles, setRoles] = useState([]);
    
    useEffect(() => {
        fetchRoles();
    }, []);
    
    const fetchRoles = () => {
        axios.get('/api/roles')
            .then(response => {
                console.table(response.data);
                setRoles(response.data);
            })
            .catch(error => {
                console.error('Error fetching roles:', error);
            });
    };
    
    const deleteRole = (roleId) => {
        if (confirm('Are you sure you want to delete this role?')) {
            axios.delete(`/api/roles/${roleId}`)
                .then(() => {
                    fetchRoles(); // Refresh the list
                    alert('Role deleted successfully!');
                })
                .catch(error => {
                    alert('Error deleting role: ' + (error.response?.data?.message || 'Unknown error'));
                });
        }
    };
    
    return (
        <div>
            <div className="bg-white shadow-xl rounded-lg border border-gray-100 mb-8">
                <div className="bg-navy-900 text-white px-8 py-6 rounded-t-lg">
                    <h2 className="text-3xl font-bold flex items-center">
                        <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Manage Roles
                    </h2>
                    <p className="text-navy-200 mt-2">View, edit, and delete system roles</p>
                </div>
            </div>
            
            {Array.isArray(roles) && roles.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {roles.map(role => (
                        <div key={role.id} className="bg-white shadow-lg rounded-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-200">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="h-12 w-12 bg-navy-100 rounded-lg flex items-center justify-center">
                                                <svg className="h-6 w-6 text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-navy-900">
                                                {role.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {role.users_count || 0} user{(role.users_count || 0) !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                {role.description && (
                                    <div className="mb-4">
                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            {role.description}
                                        </p>
                                    </div>
                                )}
                                
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Users assigned
                                    </div>
                                    <button
                                        onClick={() => deleteRole(role.id)}
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white shadow-lg rounded-lg border border-gray-100 p-8 text-center">
                    <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No roles found</h3>
                    <p className="text-gray-500">Get started by creating your first role</p>
                </div>
            )}
        </div>
    );
}

export default RoleList;
