// src/pages/AuthScreen.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function AuthScreen() {
    const { signUpWithRedirect ,loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                    {isAuthenticated ? 'Welcome Back!' : 'Welcome to BLS India Visa and Consular Services'}
                </h1>
                <p className="text-gray-500 mb-6">
                    {isAuthenticated ? 'You are logged in!' : 'Login or Sign Up to continue.'}
                </p>

                {isAuthenticated ? (
                    <button
                        onClick={() => logout({ returnTo: window.location.origin })}
                        className="w-full py-2 bg-slate-500 text-white rounded hover:bg-red-100 transition"
                    >
                        Log Out
                    </button>
                ) : (
                    <div className="space-y-4">
                        <button
                            onClick={() => loginWithRedirect()}
                            className="w-full py-2 bg-slate-500 text-white rounded hover:bg-blue-200 transition"
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => loginWithRedirect({authorizationParams: { screen_hint: "signup", }})}
                            className="w-full py-2 bg-red-950 text-white rounded hover:bg-red-200 transition"
                        >
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AuthScreen;