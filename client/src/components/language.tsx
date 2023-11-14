import React, { useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Menu, Space } from 'antd'
import FlagsVN from 'country-flag-icons/react/3x2/VN'
import FlagsUS from 'country-flag-icons/react/3x2/GB'
import styles from './Language.module.scss'
export interface IitemsInterface {
  label: string
  key: string
  flag: React.ReactNode
}

const items: IitemsInterface[] = [
  { label: 'Tiếng Việt', key: 'vi', flag: <FlagsVN /> },
  { label: 'English', key: 'en', flag: <FlagsUS /> }
]

const Language: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(items[0]?.label)
  const [flagIcon, setFlagIcon] = useState<React.ReactNode>([items[0]?.flag])

  const handleMenuClick = (e: any) => {
    const selectedKey = e.key
    const selectedItem = items.find(item => item.key === selectedKey)
    if (selectedItem) {
      setFlagIcon(selectedItem.flag)
      setSelectedLanguage(selectedItem.label)
    }
  }
  const menu = (
    <Menu onClick={event => handleMenuClick(event)} mode='vertical'>
      {items.map(item => (
        <Menu.Item key={item.key}>
          <div className={styles.MenuListItem}>
            <div className={styles.itemFlag}>{item.flag}</div>
            <div className={styles.itemLabel}>{item.label}</div>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  )
  return (
    <Dropdown overlay={menu}>
      <Space>
        <div className={styles.FormSelect}>
          <div className={styles.iconFlags}>{flagIcon}</div>
          {selectedLanguage}
          <DownOutlined />
        </div>
      </Space>
    </Dropdown>
  )
}

export default Language
