import React from 'react';
import { useNavigate } from 'react-router';
const TypesDashboard = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen w-screen h-full bg-indigo-50 gap-3">
                <h1 className="text-4xl font-bold text-indigo-700 mb-8">Explore Your Role in School Management</h1>
                <div className="flex flex-wrap justify-center gap-6">
                    <button
                        onClick={() => {
                            localStorage.setItem('role', 'Student');
                            navigate('/loginform')

                        }}
                        style={{ padding: '10px 20px' }}
                        className="px-4 py-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors duration-300"
                    >
                        Student
                    </button>
                    <button
                        onClick={() => {
                            localStorage.setItem('role', 'Teacher');
                            navigate('/loginform')}}
                    style={{ padding: '10px 20px' }}
                        className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors duration-300"
                    >
                        Teacher
                    </button>
                </div>
            </div>
        </>
    );
};

export default TypesDashboard;
