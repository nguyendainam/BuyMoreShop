import React, { useState, useEffect } from 'react'
import style from './AddProduct.module.scss'
import {
  Input,
  Typography,
  Select,
  Upload,
  Button,
  InputNumber,
  message,
  Modal
} from 'antd'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { ImCancelCircle } from 'react-icons/im'
import {
  Size,
  Color,
  Category,
  Brand,
  Discount
} from '../../../components/datatest/Select'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import { PlusOutlined } from '@ant-design/icons'

// =================================================================  //
interface IlistInventory {
  size: string
  color: string
  quantity: number
  price: number
  Image?: UploadFile[]
}

interface IProduct {
  nameVI: string
  nameEN: string
  category: string
  brand: string
  discount: number | string | null
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
)

// ==================================================================================
// ==================================================================================
// ==================================================================================

export default function AddProduct () {
  const [product, setproduct] = useState<IProduct>({
    nameVI: '',
    nameEN: '',
    category: '',
    brand: '',
    discount: null
  })

  const [listInventory, setListInventory] = useState<IlistInventory[]>([])

  const newProduct: IlistInventory = {
    size: '',
    color: '',
    quantity: 1,
    price: 0,
    Image: []
  }

  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {}, [listInventory])

  const handleCreateNew = () => {
    setListInventory(prevState => [...prevState, newProduct])
  }

  const handleDeleteInventory = key => {
    setListInventory(prevState => {
      const updateList = [...prevState]
      updateList.splice(key, 1)
      return updateList
    })
  }

  const handleOnchange = (key: number, value: any, id: string) => {
    const coppyState: IlistInventory[] = [...listInventory]
    coppyState[key] = {
      ...coppyState[key],
      [id]: value
    }
    setListInventory(coppyState)
  }

  const handleOnchangeProduct = (value, id: string) => {
    const coppyState = { ...product }
    coppyState[id] = value
    setproduct(coppyState)
  }
  const ValidateFileUpload = file => {
    const isJpgorPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpg'
    if (!isJpgorPng) {
      console.error('You can only upload JPG or PNG files')
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      console.error('Images must be smaller than 2MB')
      return false
    }

    return isJpgorPng && isLt2M
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    )
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    if (newFileList) {
      const isValidFiles = newFileList.every(file => ValidateFileUpload(file))
      if (isValidFiles) {
        const data = newFileList.map(obj => {
          if (obj.status === 'error') {
            return { ...obj, status: 'done' }
          }
          return obj
        })

        setFileList(data)
      }
    }
  }

  const handleImageListIv = (files, key) => {
    const data = [files]
    if (data) {
      const isValidFiles = data.every(file => ValidateFileUpload(file))

      if (isValidFiles) {
        const dataImg = data.map(obj => {
          if (obj.status === 'error' || obj.status === 'uploading') {
            return { ...obj, status: 'done' }
          }
          return obj
        })

        if (dataImg[0] && dataImg[0].status === 'done') {
          console.log('Dataa.........', dataImg)
          setListInventory(prevList => {
            const updatedList = [...prevList]
            const existingUIDs = updatedList[key].Image.map(img => img.uid)

            if (!existingUIDs.includes(dataImg[0].uid)) {
              updatedList[key] = {
                ...updatedList[key],
                Image: [...updatedList[key].Image, dataImg[0]] // Lưu trạng thái thứ tư của ảnh
              }
            }

            return updatedList
          })
        }
      }
    }
  }

  const handleRemoveImage = (file, index) => {
    // Xóa ảnh khỏi danh sách
    const newList = listInventory[index].Image.filter(
      image => image.uid !== file.uid
    )

    setListInventory(prevList => {
      const updatedList = [...prevList]
      updatedList[index] = {
        ...updatedList[index],
        Image: newList
      }
      return updatedList
    })
  }

  console.log(listInventory)

  return (
    <div className={style.mainAddProduct}>
      <div className={style.titleheader}>Add product</div>

      <div className={style.formProduct}>
        <div className={style.inputWidth}>
          <Typography.Title level={5}>Name Product VI </Typography.Title>
          <Input
            value={product.nameVI}
            onChange={event =>
              handleOnchangeProduct(event.target.value, 'nameVI')
            }
          />
        </div>
        <div className={style.inputWidth}>
          <Typography.Title level={5}>Name Product EN </Typography.Title>
          <Input
            value={product.nameEN}
            onChange={event =>
              handleOnchangeProduct(event.target.value, 'nameEN')
            }
          />
        </div>
        <div className={style.inputWidthMin}>
          <Typography.Title level={5}> Category</Typography.Title>
          <Select options={Category} />
        </div>
        <div className={style.inputWidthMin}>
          <Typography.Title level={5}> Brand</Typography.Title>
          <Select options={Brand} />
        </div>
        <div className={style.inputWidthMin}>
          <Typography.Title level={5}> Discount</Typography.Title>
          <Select options={Discount} />
        </div>

        <div className={style.inputWidth}>
          <div className={style.viewFile}>
            <Typography.Title level={5}> Image Show</Typography.Title>

            <Upload
              listType='picture-card'
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              multiple
              accept='.png,.jpeg,.jpg,'
            >
              {fileList.length >= 2 ? null : uploadButton}
            </Upload>

            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={() => setPreviewOpen(false)}
            >
              <img alt='example' style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
          <div className={style.viewImage}></div>
        </div>
      </div>

      <div className={style.formInventory}>
        các thông tin liên quan
        {listInventory.map((item, index) => {
          const dataImage = listInventory[index].Image
          return (
            <div className={style.productInve} key={index}>
              <div className={style.inputWidthMin15}>
                <Typography.Title level={5}> Size</Typography.Title>
                <Select
                  options={Size}
                  onChange={(event, options) =>
                    handleOnchange(index, options.value, 'size')
                  }
                  value={item.size}
                />
              </div>
              <div className={style.inputWidthMin15}>
                <Typography.Title level={5}> Color</Typography.Title>
                <Select
                  options={Color}
                  onChange={(event, options) =>
                    handleOnchange(index, options.value, 'color')
                  }
                  value={item.color}
                />
              </div>
              <div className={style.inputWidthMin15}>
                <Typography.Title level={5}> Quanntity</Typography.Title>
                <InputNumber
                  value={item.quantity}
                  onChange={event => handleOnchange(index, event, 'quantity')}
                  min={1}
                />
              </div>

              <div className={style.inputWidthMin15}>
                <Typography.Title level={5}> Price</Typography.Title>
                <Input
                  value={item.price}
                  onChange={event =>
                    handleOnchange(index, event.target.value, 'price')
                  }
                  type='number'
                />
              </div>
              <div className={style.inputMaxWidth}>
                <Typography.Title level={5}> Image</Typography.Title>
                <Upload
                  listType='picture-card'
                  onChange={file => handleImageListIv(file.file, index)}
                  fileList={dataImage}
                  onRemove={file => handleRemoveImage(file, index)}
                >
                  {listInventory[index].Image.length >= 4 ? null : uploadButton}
                </Upload>
              </div>

              <div className={style.cancelForm}>
                <div className={style.icon}>
                  <ImCancelCircle
                    onClick={() => handleDeleteInventory(index)}
                  />
                </div>
              </div>
            </div>
          )
        })}
        <div className={style.addformInput}>
          <div className={style.icon} onClick={handleCreateNew}>
            <MdOutlineAddCircleOutline />
          </div>
        </div>
        <div className={style.formSave}>
          <Button type='primary'>Save</Button>
          <Button type='default'>Clear</Button>
        </div>
      </div>
    </div>
  )
}
