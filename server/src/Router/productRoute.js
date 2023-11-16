import { Router } from 'express'
import categoryController from '../controller/product/categoryController.js'
const router = Router()

// CRUD CATEGORY
router.post('/system/cItemListCat', categoryController.createItemListCat)
router.post('/system/createorupdateCategory', categoryController.createCategory)

// CRUD BRAND

export default router
