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

export const CorUItemCategory = async (data: FormData) => {
  return await axios.post('/system/CandUItemsCategory', data)
}

export const getItemCatById = async (data: FormData) => {
  return await axios.post('/system/getAllItemCategorybyId', data)
}

// PRODUCT
export const CreateProduct = async (data: FormData) => {
  return await axios.post(`/system/createProduct`, data)
}


// BRANDS

export const CreateorUpdateBrand = async (data: FormData) => {
  return await axios.post('/system/createOrupdateBrand', data)
}