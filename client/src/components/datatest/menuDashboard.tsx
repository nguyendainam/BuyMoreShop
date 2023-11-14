import {} from 'react-icons/fa6'
import { HomeOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons'

interface IMenuDashboard {
  key: string
  label: string
  icon: React.ReactElement
  children: {
    key: string
    label: string
    link?: string
  }[]
}

export const menuDashboard: IMenuDashboard[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <HomeOutlined />,

    children: [
      {
        key: 'dashboard1',
        label: 'dashboard1'
      },
      {
        key: 'dashboard2', // Removed space in key
        label: 'dashboard 2'
      }
    ]
  },
  {
    key: 'product',
    label: 'Product',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: 'product1',
        label: 'product1'
      },
      {
        key: 'product 2',
        label: 'product 2'
      }
    ]
  },
  {
    key: 'category',
    label: 'Category',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: 'category1',
        label: 'category1'
      },
      {
        key: 'category 2',
        label: 'category 2'
      },
      {
        key: 'category 2',
        label: 'category 2'
      }
    ]
  },
  {
    key: 'user',
    label: 'User',
    icon: <UserOutlined />,
    children: [
      {
        key: 'User',
        label: 'User'
      },
      {
        key: 'User 2',
        label: 'User 2'
      },
      {
        key: 'User 2',
        label: 'User 2'
      }
    ]
  }
]

export default menuDashboard
