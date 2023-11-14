import React from 'react'
import { Input, Select, Space } from 'antd'
import styles from './search.module.scss'
const { Option } = Select
import { BsSearch } from 'react-icons/bs'

const selectBefore = (
  <Select defaultValue='All Product'>
    <Option>AllCategory</Option>
    <Option>Chair</Option>
  </Select>
)

const Search: React.FC = () => (
  <Space.Compact direction='vertical' size='large'>
    <Input
      className={styles.searchInputCustom}
      addonBefore={selectBefore}
      addonAfter={
        <div>
          <BsSearch />
        </div>
      }
      defaultValue='mysite'
    />
  </Space.Compact>
)

export default Search
