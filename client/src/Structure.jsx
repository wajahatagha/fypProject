import React from 'react'
import Head from './Head'
import { Outlet } from 'react-router-dom'

function Structure() {
  return (
    <div>
      <Head />
      <Outlet />
    </div>
  )
}

export default Structure
