import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from '../ui/toaster'

export default function Authlayout() {
  return (
    <>
      <Outlet/>
      <Toaster/>
    </>
  )
}
