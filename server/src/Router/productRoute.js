import { Router } from 'express'
import categoryController from '../controller/product/categoryController.js'
import brandController from '../controller/product/brandController.js'
import productController from '../controller/product/productController.js'
const router = Router()

// CRUD CATEGORY
router.post('/system/cItemListCat', categoryController.createItemListCat)
router.post('/system/createorupdateCategory', categoryController.createCategory)
router.post(
  '/system/createUpdateItem',
  categoryController.createOrUpdateItemCategory
)

// CRUD BRAND

router.post('/system/createOrupdateBrand', brandController.createOrUpdate)



// CRUD PRODUCT

router.post('/system/createProduct', productController.createProduct)

export default router
