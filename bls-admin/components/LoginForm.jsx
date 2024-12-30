import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

export const LoginForm = ({ onLogin, handleSwitchToSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
        email,
        password,
      });
      const { data } = response;
      const decodedToken = jwtDecode(data.token);
      
      if (data.token) {
        try {
          localStorage.setItem('userName', data.userName);
          localStorage.setItem('jwtToken', data.token);
          localStorage.setItem('userId', data.id);
          localStorage.setItem('role',data.role)         
        } catch (storageError) {
          console.error('Failed to store or decode token:', storageError);
        }
      } else {
        console.warn('No token received from the server');
      }
      onLogin(data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
    finally{
      setIsSubmitting(false)
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen my-auto bg-slate-100"> 

    <div className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-xl">
      <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Login</h2>
      <form onSubmit={handleSubmit}>
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
         {isSubmitting ? 'loading...' : 'Login'}
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{" "}
        <span
          onClick={handleSwitchToSignUp}
          className="text-blue-600 cursor-pointer hover:text-blue-700"
        >
          Sign Up
        </span>
      </p>
    </div>
    </div>
  );
};
