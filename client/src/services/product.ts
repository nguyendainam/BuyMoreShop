import axios from '../until/axios.ts'
/*
 *
 *
 *
 *
 */
// CATEGORY
export const CorUCategories = async (data: FormData) => {
  return await axios.post('/system/CandUCategory', data)
}
export const getAllCategory = async () => {
  return await axios.get('/system/getAllCategory')
}

export const CorUListCategory = async (data: FormData) => {
  return await axios.post('/system/CandUListCategory', data)
}

export const getAllListCategory = async () => {
  return await axios.get('/system/getAllListCategory')
}

export const getListCatHomePage = async () => {
  return await axios.get('/system/getCategoryHomeClient')
}

export const CorUItemCategory = async (data: FormData) => {
  return await axios.post('/system/CandUItemsCategory', data)
}

export const getItemCatById = async (key?: string) => {
  return await axios.get(`/system/getAllItemCategorybyId?key=${key}`)
}

export const createOrUpdatePrType = async (data: FormData) => {
  return await axios.post('/system/creOrUpdProductType', data)
}

export const getAllProductType = async () => {
  return await axios.get('/system/getAllProductType')
}

// PRODUCT
export const CreateProduct = async (data: FormData) => {
  return await axios.post(`/system/createProduct`, data)
}


export const getAllProduct = async () => {
  return await axios.get(`/system/getAllProduct`)
}

// BRANDS

export const CreateorUpdateBrand = async (data: FormData) => {
  return await axios.post('/system/createOrupdateBrand', data)
}

export const GetAllBrands = async () => {
  return await axios.get('/system/getAllBrand')
}

//  DISCOUNT
export const getAllDiscount = async () => {
  return await axios.get('/system/getAllDiscount')
}

export const createOrUpdateDiscount = async (data: FormData) => {
  return await axios.post('/system/createOrUpdateDiscount', data)
}

// ui

export const createNewSlide = async (data: FormData) => {
  return await axios.post('/system/ui/createCarousel', data)
}

export const getImageCarousel = async (key: string) => {
  return await axios.get(`/system/ui/getImgCarousel?key=${key}`)
}
