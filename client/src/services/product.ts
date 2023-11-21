import axios from '../until/axios.ts'

export const CreateProduct = async (data) => {
    return await axios.post(
        `/system/createProduct`, data
    )
} 