// components/AuthWrapper.tsx
'use client'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

export default function AuthWrapper({ children }) {
  const { isLoading, error, isAuthenticated, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const getToken = async () => {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently()
          localStorage.setItem('auth_token', token)
        }
      } catch (error) {
        console.error('Error getting token:', error)
      }
    }
    getToken()
  }, [isAuthenticated, getAccessTokenSilently])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return <div>Authentication Error: {error.message}</div>
  }

  return children
}