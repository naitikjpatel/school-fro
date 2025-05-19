// components/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, student }) => {
  if (!isOpen || !student) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-transparent bg-opacity-40 flex justify-center items-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button> */}

        <div className="mb-4 text-center">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
            Student Details
          </h2>
          <p className="text-sm text-gray-500">Full student profile overview</p>
        </div>

        <div className="space-y-3 text-gray-700">
          <div>
            <strong>First Name:</strong> {student.firstName}
          </div>
          <div>
            <strong>Last Name:</strong> {student.lastName}
          </div>
          <div>
            <strong>Email:</strong> {student.email}
          </div>
          <div>
            <strong>Address:</strong> {student.userDetails?.address || 'N/A'}
          </div>
          <div>
            <strong>Phone:</strong> {student.userDetails?.phone || 'N/A'}
          </div>
          <div>
            <strong>Details:</strong> {student.userDetails?.details || 'N/A'}
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
