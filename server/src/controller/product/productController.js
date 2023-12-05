import productServices from "../../services/product/productServices.js"

const createProduct = async (req, res) => {
    try {
        let result = await productServices.createProduct(req.body)
        return res.status(200).json(result)
    } catch (e) {
        console.log(e)
        return res.status(400).json(e)
    }
}

const getAllProduct = async (req, res) => {
    try {
        let result = await productServices.getAllProductServices()
        return res.status(200).json(result)
    } catch (e) {
        console.log(e)
        return res.status(400).json(e)
    }
}

export default {
    createProduct,
    getAllProduct
}