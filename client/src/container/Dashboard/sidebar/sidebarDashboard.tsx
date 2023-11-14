import React from 'react'
import style from './sidebarDashboard.module.scss'
import { Logo } from '../../../assets/image'
import Sider from 'antd/es/layout/Sider'
import { Menu } from 'antd'
import menuDashboard from '../../../components/datatest/menuDashboard'

export default function SidebarDashboard () {
  const menu = menuDashboard
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

  console.log(menuDashboard)

  return (
    <div className={style.mainSidebar}>
      <div className={style.formLogo}>
        <img className={style.logo} src={Logo} alt='Logo' />
      </div>

      <div className={style.listItems}>
        <Sider>
          <Menu
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            items={items}
            className={style.menuItems}
            theme='light'
          />
        </Sider>
      </div>
    </div>
  )
}
