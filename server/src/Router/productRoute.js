import { Router } from 'express'
import categoryController from '../controller/product/categoryController.js'
const router = Router()

// CRUD CATEGORY
router.post('/system/cItemListCat', categoryController.createItemListCat)
router.post('/system/createorupdateCategory', categoryController.createCategory)
router.post(
  '/system/createUpdateItem',
  categoryController.createOrUpdateItemCategory
)

// CRUD BRAND

export default router
