// MainDashboard.jsx
import React, { useState } from 'react'
import style from './mainDashboard.module.scss'
import { SidebarDashboard } from './sidebar/sidebarDashboard'
import Header from './header/headerDashboard'
import SystemRouter from '../../router/systemRouter'
import { FloatButton } from 'antd';
import { GoSidebarCollapse } from "react-icons/go";
const MainDashboard: React.FC = () => {

  const [openSidebar, setOpenSidebar] = useState<boolean>(false)


  const handleOnChange = () => {
    setOpenSidebar(!openSidebar)
  }



  return (
    <div className={style.mainDashboard}>
      <div className={style.openSidebar} onClick={handleOnChange}>
        <GoSidebarCollapse />
      </div>
      {openSidebar && (
        <div className={style.formSidebar}>
          <SidebarDashboard onClose={handleOnChange} />
        </div>

      )}

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
