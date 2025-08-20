import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        roles: []
    });
    const [availableRoles, setAvailableRoles] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('/api/roles')
            .then(response => {
                setAvailableRoles(response.data);
            })
            .catch(error => {
                console.error('Error fetching roles:', error);
            });
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleRoleChange = (roleId) => {
        setFormData(prev => {
            const roles = prev.roles.includes(roleId)
                ? prev.roles.filter(id => id !== roleId)
                : [...prev.roles, roleId];
                
            return { ...prev, roles };
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('/api/users', formData)
            .then(() => {
                navigate('/users');
            })
            .catch(error => {
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }
            });
    };
    
    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow-xl rounded-lg border border-gray-100">
                <div className="bg-navy-900 text-white px-8 py-6 rounded-t-lg">
                    <h2 className="text-3xl font-bold flex items-center">
                        <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Add New User
                    </h2>
                    <p className="text-navy-200 mt-2">Create a new user account and assign roles</p>
                </div>
                
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-navy-900 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                                placeholder="Enter user's full name"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-2 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.name[0]}
                            </p>}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-navy-900 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                                placeholder="Enter user's email address"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-2 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.email[0]}
                            </p>}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-navy-900 mb-3">Assign Roles</label>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
                                {Array.isArray(availableRoles) && availableRoles.length > 0 ? (
                                    availableRoles.map(role => (
                                        <div key={role.id} className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-navy-300 transition-colors">
                                            <input
                                                type="checkbox"
                                                id={`role-${role.id}`}
                                                checked={formData.roles.includes(role.id)}
                                                onChange={() => handleRoleChange(role.id)}
                                                className="h-5 w-5 rounded border-gray-300 text-navy-600 focus:ring-navy-500 focus:ring-2"
                                            />
                                            <label htmlFor={`role-${role.id}`} className="ml-3 cursor-pointer flex-1">
                                                <div className="font-medium text-navy-900">{role.name}</div>
                                                {role.description && (
                                                    <div className="text-sm text-gray-600 mt-1">{role.description}</div>
                                                )}
                                            </label>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-4">No roles available. Please create roles first.</p>
                                )}
                            </div>
                            {errors.roles && <p className="text-red-500 text-sm mt-2 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.roles[0]}
                            </p>}
                        </div>
                        
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-navy-900 text-white py-4 px-6 rounded-lg hover:bg-navy-800 focus:outline-none focus:ring-4 focus:ring-navy-300 font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Create User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserForm;