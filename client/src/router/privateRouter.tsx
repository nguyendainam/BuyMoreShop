import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { Role } from '../common/enum'

interface IPrivateRouterProps {
  adminOnly?: boolean
}

const PrivateRouter: React.FC<IPrivateRouterProps> = ({ adminOnly }) => {
  const auth = { token: true, role: 'ADMIN' }

  if (adminOnly) {
    return auth.token && auth.role === Role.ADMIN ? (
      <Outlet />
    ) : (
      <Navigate to='/loginAdmin' />
    )
  } else {
    return auth.token && auth.role === Role.USER ? (
      <Outlet />
    ) : (
      <Navigate to='/login' />
    )
  }
}

export default PrivateRouter
