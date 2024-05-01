import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App'
import AdminLayout from './AdminLayout'
import AdminHome from './AdminHome'

export default function AdminRoutes() {
  return (
    <div>
        <Routes>
            {/* <Route path='/' element={App}/> */}
            <Route path='/' element={<AdminLayout />}>
                <Route path='' element={<AdminHome/>} />

            </Route>
        </Routes>
    </div>
  )
}
