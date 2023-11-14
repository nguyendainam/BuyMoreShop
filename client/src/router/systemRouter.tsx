import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Welcome from '../container/Dashboard/Welcome/welcome'
import Content from '../container/Dashboard/content/contentDashboard'
export default function SystemRouter () {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='content' element={<Content />} />
    </Routes>
  )
}
