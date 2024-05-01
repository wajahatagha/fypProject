import React from 'react'
import { Outlet } from 'react-router-dom'
import Foot from '../Foot'

export default function AdminLayout() {
  return (
    <div>
        <h1>This is Admin</h1>
        <Outlet />
        
    </div>
  )
}
