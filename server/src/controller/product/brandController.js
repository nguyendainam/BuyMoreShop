import brandServices from "../../services/product/brandServices.js";


const createOrUpdate = async (req, res) => {
    try {
        let image = req.files
        let result = await brandServices.CreateOrUpdateBrand(req.body, image)
        return res.status(200).json(result)
    } catch (e) {
        return res.status(400).json({
            err: - 1,
            e
        })
    }
}







export default {
    createOrUpdate
}