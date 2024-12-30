'use client';

import { useState, useEffect } from 'react';
import localFont from 'next/font/local';
import './globals.css';
import { MainSidebar } from '@/components/MainSidebar';
import { SignUpForm } from '@/components/SignUpForm';
import { LoginForm } from '@/components/LoginForm';
import { useRouter } from 'next/navigation';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isCheckingLogin, setIsCheckingLogin] = useState(true); // State to handle login check
  const router = useRouter()
  


  useEffect(() => {
    // Check login status on client-side
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsLoggedIn(true);
    }
    setIsCheckingLogin(false); // Finished login status check
  }, []);

  const handleLogin = () => {
    // Handle login logic here
    router.push('/')
    setIsLoggedIn(true);
    setShowSignUp(false);
  };

  const handleSwitchToSignUp = () => {
    setShowSignUp(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignUp(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    setShowSignUp(false);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Show loading spinner during login check */}
        {isCheckingLogin ? (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full border-t-transparent animate-spin"></div>
            <p className="mt-4 text-xl font-semibold text-gray-700">Loading...</p>
          </div>
        </div>
        ) : (
          <>
            {!isLoggedIn ? (
              <div className="flex items-center justify-center min-h-screen">
                {showSignUp ? (
                  <SignUpForm handleSwitchToLogin={handleSwitchToLogin} />
                ) : (
                  <LoginForm onLogin={handleLogin} handleSwitchToSignUp={handleSwitchToSignUp} />
                )}
              </div>
            ) : (
              <MainSidebar handleLogout={handleLogout}>{children}</MainSidebar>
            )}
          </>
        )}
      </body>
    </html>
  );
}
