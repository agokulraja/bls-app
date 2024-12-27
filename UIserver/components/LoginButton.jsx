"use client";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';  

const Login = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      Cookies.set('user', JSON.stringify(user), { expires: 7 });
    }
  }, [isAuthenticated, user]);

  return (
    <div className="relative flex items-center space-x-4">
      {isAuthenticated ? (
        <div className="flex items-center space-x-2">
          {user?.picture ? (
            <img
              src={user.picture}
              alt="User Avatar"
              className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer"
              onClick={toggleDropdown}
            />
          ) : (
            <div
              className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
              onClick={toggleDropdown}
            >
              <span className="text-gray-600">No Image</span>
            </div>
          )}
          <span className="text-sm font-semibold cursor-pointer" onClick={toggleDropdown}>
            {user?.name}
          </span>

          {dropdownOpen && (
            <div className="z-50 absolute right-0 my-4 top-5 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900">{user?.name}</span>
                <span className="block text-sm text-gray-500 truncate">{user?.email}</span>
              </div>
              <ul className="py-2">
                <li>
                  <button
                    onClick={() => {
                      logout({ returnTo: window.location.origin });
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => router.push('/login')}
          className="px-2 text-sm py-2 bg-blue-100 text-black rounded hover:bg-blue-200 transition duration-200"
        >
          Log In / Sign Up
        </button>
      )}
    </div>
  );
};

export default Login;