

import { getAuthSession } from '@/lib/authOption'
import React from 'react'

const DashboardPage = async () => {
  const session =await getAuthSession()
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage