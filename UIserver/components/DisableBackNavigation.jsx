'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DisableBackNavigation() {
  const router = useRouter()

  useEffect(() => {
    const preventGoingBack = () => {
      window.history.pushState(null, '', window.location.href)
      router.push('/')
    }

    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', preventGoingBack)

    return () => {
      window.removeEventListener('popstate', preventGoingBack)
    }
  }, [router])

  return null
}