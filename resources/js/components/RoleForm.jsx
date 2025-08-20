import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RoleForm() {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('/api/roles', formData)
            .then(() => {
                setFormData({ name: '', description: '' });
                alert('Role added successfully!');
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Add New Role
                    </h2>
                    <p className="text-navy-200 mt-2">Create a new role with specific permissions</p>
                </div>
                
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-navy-900 mb-2">Role Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                                placeholder="e.g., Admin, Editor, Viewer"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-2 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.name[0]}
                            </p>}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-navy-900 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                                placeholder="Describe what this role can do and its responsibilities..."
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-2 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.description[0]}
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
                                Create Role
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RoleForm;
