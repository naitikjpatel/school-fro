import React from 'react';

const TypesDashboard = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen w-full h-full bg-indigo-50">
                <h1 className="text-4xl font-bold text-indigo-700 mb-8">Explore Your Role in School Management</h1>
                <div className="flex flex-wrap justify-center gap-6">
                    <button
                        className="px-6 py-3 bg-indigo-200 text-red-700 font-semibold rounded-lg shadow-md hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                    >
                        Student
                    </button>
                    <button
                        className="px-6 py-3 bg-teal-200 text-teal-800 font-semibold rounded-lg shadow-md hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
                    >
                        Teacher
                    </button>
                <br/><br/>  
                    {/* <button className="px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
  <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
  <span className="relative z-20">
    Student
  </span>
</button> */}
                </div>
            </div>
        </>
    );
};

export default TypesDashboard;
