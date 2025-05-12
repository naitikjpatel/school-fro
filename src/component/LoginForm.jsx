import React, { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Replace with your API endpoint
      const response = await fetch("http://localhost:9999/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      // Handle successful login
      console.log("Login successful");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  w-screen h-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
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
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
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
              className="w-full  border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-gray-700 transition-all duration-200"
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
            className=" py-3 px-4 bg-gradient-to-r w-[70%] from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-all duration-200 hover:scale-105"
            disabled={isLoading}
            style={{ padding: "10px 20px", marginBottom: "20px" }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
