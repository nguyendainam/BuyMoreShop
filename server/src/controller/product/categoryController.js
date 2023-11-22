import categoryServices from '../../services/product/categoryServices.js'

//  category => create List Category
const createCategory = async (req, res) => {
  try {
    let result = await categoryServices.createOrUpdateCategory(req.body)
    return res.status(200).json(result)
  } catch (e) {
    console.log(e)
    return res.status(400).json(e)
  }
}

const getAllcategory = async (req, res) => {
  try {
    let result = await categoryServices.getAllCategoryServices()
    return res.status(200).json(result)
  } catch (e) {
    console.log(e)
    return res.status(400).json(e)
  }
}

/*
 *
 *
 *
 *
 */
const createItemListCat = async (req, res) => {
  try {
    let result = await categoryServices.createOrUpdateItesmToList(req.body)

    return res.status(200).json(result)
  } catch (e) {
    return res.status(400).json(e)
  }
}
/*
 *
 *
 *
 *
 */

const createOrUpdateItemCategory = async (req, res) => {
  try {
    let result = await categoryServices.createOrUpdateItemCategory(req.body)
    return res.status(200).json(result)
  } catch (e) {
    return res.status(400).json(e)
  }
}

export default {
  createCategory,
  createItemListCat,
  createOrUpdateItemCategory,
  getAllcategory
}
