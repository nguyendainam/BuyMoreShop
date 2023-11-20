import productServices from "../../services/product/productServices.js"

const createProduct = async (req, res) => {
    try {
        let listImg = req.files.fileImages
        let result = await productServices.createProduct('test', listImg)
        return res.status(200).json(result)

    } catch (e) {
        return res.status(400).json(e)
    }
}



export default {
    createProduct
}