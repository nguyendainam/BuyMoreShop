import { getAllCategory, getAllListCategory } from '../services/product'

interface ListCategoryDropdown {
  key: string | number
  title: [object, object]
  image?: string
}

const language: string = 'en'

export const getListCategory = async () => {
  const response = await getAllCategory()
  const dataCategory: [ListCategoryDropdown] = response.data.items.map(
    item => ({
      key: item.Id,
      titleVi: item.NameVI,
      titleEN: item.NameEN,
      image: item.ImageCat
    })
  )

  return dataCategory
}

interface IdataListCategory {
  idListCat: string
  nameENCategory: string
  nameVICategory: string
  nameEN: string
  nameVI: string
  IdCat: string
}

export const AllListCategory = async () => {
  const response = await getAllListCategory() // Assuming getAllListCategory is a function
  const resolveData: IdataListCategory[] = response.data.items.map(item => ({
    idListCat: item.idListCat,
    nameENCategory: item.NameVICategory,
    nameVICategory: item.NameENCategory,
    nameEN: item.nameEN,
    nameVI: item.nameVI,
    IdCat: item.IdCat
  }))

  return resolveData
}
