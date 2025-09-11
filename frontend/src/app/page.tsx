import DashboardContent from '@/components/HomeContent'
import { AuthProvider } from '@/lib/AuthContext'
import React from 'react'

function Dashboard() {
  return (
    <AuthProvider>
        <DashboardContent/>
    </AuthProvider>
  )
}

export default Dashboard
