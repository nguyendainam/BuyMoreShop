import React, { useEffect, useState } from 'react'
import styles from './ListCategory.module.scss'
import { Button, Input, Select, Space, Table, Typography, message } from 'antd'
import {
  getListCategory,
  AllListCategory
} from '../../../components/GetdataCategory'
import { CorUItemCategory, getAllListCategory } from '../../../services/product'
import FormData from 'form-data'
// import FormData from 'form-data'
// import { CorUListCategory } from '../../../services/product'
// import { AllListCategory } from '../../../components/GetdataCategory'
// import Column from 'antd/es/table/Column'
// import { MdDelete, MdEditSquare } from 'react-icons/md'

interface IOptions {
  value: string
  label: string
}

interface IListCategory {
  IdListCat: string
  nameVI: string
  nameEN: string
  IdCat: string
}

interface DataType {
  key: string
  Category: string
  nameVI: string
  nameEN: string
  IdCategory: string
}

export default function ItemsCategory () {
  const [options, setOptions] = useState<IOptions[]>([])
  const [optionsList, setOptionsList] = useState<IOptions[]>([])
  const [openSelect, setOpenSelect] = useState<boolean>(true)
  const [action, setAction] = useState('create')
  const [itemCategory, setItemCategory] = useState<IListCategory>({
    IdListCat: '',
    nameVI: '',
    nameEN: '',
    IdCat: ''
  })

  const handleGetCategory = async () => {
    // ShowLoading.show()

    const data = await getListCategory()
    const newOptions = data.map(item => ({
      value: item.key.toString(),
      label: item.titleVi
    }))
    setOptions(newOptions)
  }

  const handleGetListItem = async () => {}

  const handleOnchangeCate = async (value: string, id: string) => {
    setItemCategory(prevCategory => ({ ...prevCategory, [id]: value }))
    const data = await AllListCategory()
    const listCatById = data.filter(
      item => item.IdCat.toString() === itemCategory.IdCat
    )

    setItemCategory(prevState => ({
      ...prevState,
      IdListCat: ''
    }))

    if (listCatById.length > 0) {
      setItemCategory(prevState => ({
        ...prevState,
        IdListCat: ''
      }))

      const newOptionList = listCatById.map(item => ({
        value: item.idListCat,
        label: item.nameVICategory
      }))

      setOpenSelect(false)
      setOptionsList(newOptionList)
    } else {
      setOptionsList([])
      setOpenSelect(true)
    }

    console.log(itemCategory)
  }

  const handleOnchange = (value: string, id: string) => {
    setItemCategory(prevCategory => ({ ...prevCategory, [id]: value }))
  }

  const handleOnSave = async () => {
    const formdata = new FormData()
    if (action === 'create') {
      formdata.append('action', action)
      formdata.append('nameVI', itemCategory.nameVI)
      formdata.append('nameEN', itemCategory.nameEN)
      formdata.append('Id_listCategory', itemCategory.IdListCat)
      const SaveItem = await CorUItemCategory(formdata)
      if (SaveItem.data.err === 0) {
        message.success('Create Items Successfully')
      } else {
        message.error('Create Items Failure')
      }
    }
  }

  useEffect(() => {
    handleGetCategory()
    handleGetListItem()
  }, [])

  return (
    <div className={styles.mainListCategory}>
      <div className={styles.formInput}>
        <div className={styles.inputMaxWidth}>
          <Typography.Title level={5}>Category</Typography.Title>
          <Select
            defaultValue='Select Type Category'
            className={styles.formSelect}
            options={options}
            onChange={value => handleOnchangeCate(value, 'IdCat')}
            value={itemCategory.IdCat}
          ></Select>
        </div>
        <div className={styles.inputMaxWidth}>
          <Typography.Title level={5}>List Item</Typography.Title>
          <Select
            defaultValue='Select Type Category'
            className={styles.formSelect}
            disabled={openSelect}
            options={optionsList}
            onChange={value => handleOnchange(value, 'IdListCat')}
            value={itemCategory.IdListCat}
          ></Select>
        </div>
        <div className={styles.inputMaxWidth}>
          <Typography.Title level={5}>Name VI </Typography.Title>
          <Input
            value={itemCategory.nameVI}
            onChange={event => handleOnchange(event.target.value, 'nameVI')}
          />
        </div>
        <div className={styles.inputMaxWidth}>
          <Typography.Title level={5}>Name EN </Typography.Title>
          <Input
            value={itemCategory.nameEN}
            onChange={event => handleOnchange(event.target.value, 'nameEN')}
          />
        </div>
        <div className={styles.inputMaxWidth}>
          <Button type='primary' onClick={handleOnSave}>
            Save
          </Button>
          <Button type='dashed' style={{ marginLeft: '5px' }}>
            Clear
          </Button>
        </div>
      </div>
      <div className={styles.formList}>
        {/* <Table dataSource={dataTable} pagination={false} scroll={{ y: 500 }}>
          <Column title='Category' dataIndex='Category' key='IdCategory' />
          <Column title='NameVi' dataIndex='nameVI' key='IdCategory' />
          <Column title='NameEN' dataIndex='nameEN' key='IdCategory' />
          <Column
            title='Action'
            key='key'
            render={record => (
              <Space size='middle'>
                <div
                  className={styles.buttonEdit}
                  onClick={() => handleDataupdate(record, 'update')}
                >
                  <MdEditSquare />
                </div>

                <div className={styles.buttonDelete}>
                  <MdDelete
                    onClick={() => handleDataupdate(record, 'delete')}
                  />
                </div>
              </Space>
            )}
          />
        </Table> */}
      </div>
    </div>
  )
}
