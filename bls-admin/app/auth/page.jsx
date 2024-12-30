'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignUpForm } from '@/components/SignUpForm';
import { LoginForm } from '@/components/LoginForm';

export default function AuthPage() {
  const [showSignUp, setShowSignUp] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem('jwtToken', 'dummyToken'); 
    router.push('/'); 
  };
  console.log("hello")

  const handleSwitchToSignUp = () => setShowSignUp(true);
  const handleSwitchToLogin = () => setShowSignUp(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignUpForm/>
      {showSignUp ? (
        <SignUpForm handleSwitchToLogin={handleSwitchToLogin} />
      ) : (
        <LoginForm onLogin={handleLogin} handleSwitchToSignUp={handleSwitchToSignUp} />
      )}
    </div>
  );
}
