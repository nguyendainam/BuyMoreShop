import React, { useState, useEffect } from 'react'
import style from './Header.module.scss'
import Language from '../../../components/language'
import { Logo } from '../../../assets/image'
import Search from '../../../components/search'
import _throttle from 'lodash/throttle'
import { BiUser, BiSolidCartAlt } from 'react-icons/bi'
import { AiOutlineMenu } from 'react-icons/ai'
import { Dropdown, Menu, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import dataTest from '../../../components/datatest/listItem.json'
import category from '../../../components/datatest/category.json'
import type { MenuProps } from 'antd'
import HeaderReponsive from './HeaderReponsive'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  const listItems = [
    { label: 'Home', key: 'Home', option: true },
    { label: 'Shop', key: 'Shop', option: true },
    { label: 'Product', key: 'Product', option: true },
    { label: 'Pages', key: 'Pages', option: true },
    { label: 'Blog', key: 'Blog', option: true },
    { label: 'Contact Us', key: 'home', option: false }
  ]

  useEffect(() => {
    const handleScroll = _throttle(() => {
      const scrollThreshold = 100
      const scrollPosition = Math.round(window.scrollY)
      requestAnimationFrame(() => {
        setIsScrolled(scrollPosition > scrollThreshold)
      })
    }, 100)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const handleGetData = (key: string) => {
    if (dataTest[key]) {
      const menuItems = dataTest[key].map(item => (
        <Menu.Item key={item.key} className={style.itemMenu}>
          <div className={style.formDropdownItem}> {item.label}</div>
        </Menu.Item>
      ))

      return <Menu className={style.formDropdownMenu}>{menuItems}</Menu>
    } else {
      return <></>
    }
  }

  const menuComponents = listItems.map(item => {
    const menu = handleGetData(item.key)
    return (
      <Dropdown
        key={item.key}
        className={style.itemDropdown}
        overlay={menu}
      // onClick={() => console.log(item.key)}
      >
        <Space>
          {item.label}
          {item.option ? <DownOutlined /> : ''}
        </Space>
      </Dropdown>
    )
  })

  const OptionCategory = () => {
    const testData: MenuItem[] = category.map(item => {
      const subItems: MenuItem[] | undefined =
        item.list.length > 0
          ? item.list.map(itemChild => getItem(itemChild.name, itemChild.key))
          : undefined

      return getItem(item.title, item.key, null, subItems)
    })

    const onClick: MenuProps['onClick'] = e => {
      console.log('click', e)
    }
    const categoryMenuItems = (
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        mode='vertical'
        items={testData}
      />
    )

    return (
      <Dropdown
        trigger={['click']}
        className={style.dropdownCategory}
        overlay={categoryMenuItems}
      >
        <div className={style.leftMenuHeader}>
          <div className={style.formLineIcons}>
            <AiOutlineMenu />
          </div>
          <div className={style.formTitleListCategory}>
            Browse All Categories
          </div>
        </div>
      </Dropdown>
    )
  }

  return (
    <div className={`${style.mainHeader} ${isScrolled ? style.scrolled : ''}`}>
      <div className={style.topHeader}>
        <div>You are a student and students get 20% discount</div>
        <div>
          <Language />
        </div>
      </div>

      <div className={style.topHeaderTablet}>
        <HeaderReponsive />
      </div>

      <div className={style.centerHeader}>
        <div className={style.formLogo}>
          <img src={Logo} className={style.imgLogo} />
        </div>

        <div className={style.formSearch}>
          <Search />
        </div>

        <div className={style.aboutUser}>
          <div className={style.loginUser}>
            <div className={style.iconLogin}>
              <BiUser />
            </div>
            <div className={style.centerForm}>
              <div className={style.fsmin}>Login</div>
              <div className='m-2'>Account</div>
            </div>
          </div>
          <div className={style.iconCart}>
            <BiSolidCartAlt />
          </div>
        </div>
      </div>
      <div className={`${style.MenuHeader} ${isScrolled ? style.active : ''}`}>
        <OptionCategory />
        <div className={style.centerMenuHeader}>
          <div className={style.centerDropdown}>{menuComponents}</div>
        </div>
      </div>
    </div>
  )
}
