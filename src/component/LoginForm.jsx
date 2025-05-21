import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
  });
  
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    userType: {
      userTypeId: '',
      userTypes: '',
    },
    userDetails: {
      userDetailId: '',
      details: '',
      address: '',
      phone: '',
    },
    results: [],
    courses: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
     
      const response = await axios.post("http://localhost:9999/api/users/login", {
        email: formData.email,
        userId: Number(formData.userId),
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
     console.log("Login successful", response.data);
      setUser(response.data);
      setSuccess(true);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("role", response.data.userType.userTypes);
      if (response.data.userType.userTypes === "Student" ) {
      navigate("/layoutstudent")
      }
      else if (response.data.userType.userTypes === "Teacher") {
        navigate("/layoutteacher")
      }
      
    } catch (err) {
     const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-[100%] h-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 hover:shadow-3xl"
      >
        <h2
          className="text-3xl font-bold text-center text-indigo-800 mb-8 tracking-tight"
          style={{ paddingTop: "20px" }}
        >
          Login
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm text-center rounded-lg border border-red-100">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm text-center rounded-lg border border-green-100">
            Login successful! Welcome back.
          </div>
        )}

        <div className="space-y-6" style={{ padding: "10px 20px" }}>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="userId"
              className="block text-md font-medium text-gray-800 mb-1"
            >
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-gray-700 transition-all duration-200"
              placeholder="Enter your User ID"
              required
              style={{ padding: "10px 20px", marginBottom: "10px" }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-800 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-gray-700 transition-all duration-200"
              placeholder="Enter your email address"
              required
              style={{ padding: "10px 20px", marginBottom: "10px" }}
            />
          </div>
        </div>

        <div className="mt-8 w-full flex justify-center items-center">
          <button
            type="submit"
            className="py-3 px-4 bg-gradient-to-r w-[70%] from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-all duration-200 hover:scale-105"
            disabled={isLoading}
            style={{ padding: "10px 20px", marginBottom: "20px" }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;