import style from './sidebarDashboard.module.scss'
import { Logo } from '../../../assets/image'
import Sider from 'antd/es/layout/Sider'
import { Menu } from 'antd'
import menuDashboard from '../../../components/datatest/menuDashboard'
import { useNavigate, useParams } from 'react-router-dom'
// import { useEffect, useState } from 'react'

export default function SidebarDashboard() {
  const menu = menuDashboard
  const navigate = useNavigate()
  const items = menu.map(item => {
    return {
      key: item.key,
      icon: item.icon,
      label: item.label,

      children: item.children.map(itemchild => {
        return {
          key: itemchild.key,
          label: itemchild.label
        }
      })
    }
  })
  const { '*': productParam } = useParams()
  const handleChanePath = key => {
    navigate(key)
  }
  return (
    <div className={style.mainSidebar}>
      <div className={style.formLogo}>
        <img className={style.logo} src={Logo} alt='Logo' />
      </div>

      <div className={style.listItems}>
        <Sider>
          <Menu
            onClick={({ key }) => handleChanePath(key)}
            mode='inline'
            defaultSelectedKeys={[!productParam ? '/' : productParam]}
            items={items}
            className={style.menuItems}
            theme='light'
          />
        </Sider>
      </div>
    </div>
  )
}
