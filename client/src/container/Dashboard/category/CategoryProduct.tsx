import React, { useState } from 'react'
import ImgCrop from 'antd-img-crop'
import { Upload, message } from 'antd'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import style from './CategoryProduct.module.scss'
import { Input, Typography, Button } from 'antd'
import FormData from 'form-data'
import { CorUCategories } from '../../../services/product'

interface ICategory {
  nameVI: string
  nameEN: string
}
interface IActionCategory {
  action: 'create' | 'update'
}
export default function CategoryProduct () {
  const [actionCat, setactionCat] = useState<IActionCategory>({
    action: 'create'
  })
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [category, setCategory] = useState<ICategory>({
    nameVI: '',
    nameEN: ''
  })
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  const handleOnchange = (value: string, id: string) => {
    setCategory(prevCategory => ({ ...prevCategory, [id]: value }))
  }

  const handleOnSave = async () => {
    const formData = new FormData()
    formData.append('action', actionCat.action)
    formData.append('Image', JSON.stringify(fileList))
    formData.append('NameVI', category.nameVI)
    formData.append('NameEN', category.nameEN)

    if (actionCat.action === 'create') {
      const saveData = await CorUCategories(formData)
      if (saveData.data.err === 0) {
        message.success('Created category successfully')
      } else {
        message.error('Error creating category')
      }
    }
  }

  return (
    <>
      <div className={style.formMaxWidth}>Category</div>

      <div className={style.mainCategory}>
        <div className={style.formAddCategory}>
          <div className={style.inputMaxWidth}>
            <Typography.Title level={5}>Name Product VI </Typography.Title>
            <Input
              value={category.nameVI}
              onChange={event => handleOnchange(event.target.value, 'nameVI')}
            />
          </div>
          <div className={style.inputMaxWidth}>
            <Typography.Title level={5}>Name Product EN</Typography.Title>
            <Input
              value={category.nameEN}
              onChange={event => handleOnchange(event.target.value, 'nameEN')}
            />
          </div>
          <div className={style.inputMaxWidth}>
            <Typography.Title level={5}>Icon Category</Typography.Title>
            <ImgCrop rotationSlider beforeCrop={handleOnchange}>
              <Upload
                listType='picture-card'
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 1 && '+ Upload'}
              </Upload>
            </ImgCrop>
          </div>

          <div className={style.inputMaxWidth}>
            <Button type='primary' onClick={handleOnSave}>
              SAVE
            </Button>
          </div>
        </div>
        <div className={style.formListCategory}></div>
      </div>
    </>
  )
}
