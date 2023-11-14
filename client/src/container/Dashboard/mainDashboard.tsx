// MainDashboard.jsx
import React from 'react'
import style from './mainDashboard.module.scss'
import SidebarDashboard from './sidebar/sidebarDashboard'
import Header from './header/headerDashboard'
import SystemRouter from '../../router/systemRouter'
const MainDashboard: React.FC = () => {
  return (
    <div className={style.mainDashboard}>
      <div className={style.formSidebar}>
        <SidebarDashboard />
      </div>
      <div className={style.formcontent}>
        <div className={style.formHeader}>
          <Header />
        </div>
        <div className={style.content}>
          <SystemRouter />
        </div>
      </div>
    </div>
  )
}

export default MainDashboard
