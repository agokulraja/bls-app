import React, { useState } from "react";
import axios from "axios";
import { getStoredToken } from "./LoginForm";

export const SignUpForm = ({ handleSwitchToLogin }) => {
  const [userName, setUserName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting , setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const emailDomain = email.split('@')[1];
    if (emailDomain !== "blsindia-canada.ca") {
      setError("Only emails with @blsindia-canada.ca domain can register.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/user`, {
        userName,
        email,
        password,
        mobileNumber,
      });
  
  
      if (response.data && response.data.token) {
        try {
          localStorage.setItem("jwtToken", response.data.token);
        } catch (storageError) {
          console.error("Failed to store token in local storage:", storageError);
        }
      }
  
      handleSwitchToLogin();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Sign-up failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="items-center justify-center w-full min-h-screen pt-10 my-auto bg-slate-100"> 


    <div className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-xl">
      <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium text-gray-700" htmlFor="userName">
            Username
          </label>
          <input
            type="text"
            id="userName"
            placeholder="Enter your username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 mt-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700" htmlFor="mobileNumber">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobileNumber"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full p-3 mt-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {error && <p className="mb-4 text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 font-semibold text-white bg-red-800 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSubmitting ? 'loading...' : 'Submit' }
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Already a user?{" "}
        <span
          onClick={handleSwitchToLogin}
          className="text-blue-600 cursor-pointer hover:text-blue-700"
        >
          Login here
        </span>
      </p>
    </div>
    </div>
  );
};

