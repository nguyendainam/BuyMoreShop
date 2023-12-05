import { Router } from 'express'
import categoryController from '../controller/product/categoryController.js'
import brandController from '../controller/product/brandController.js'
import productController from '../controller/product/productController.js'
import discountController from '../controller/product/discountController.js'
import manageUIController from '../controller/ui/manageUIController.js'
const router = Router()

router.post('/system/CandUCategory', categoryController.createCategory)
router.post('/system/CandUListCategory', categoryController.createItemListCat)
router.post(
  '/system/CandUItemsCategory',
  categoryController.createOrUpdateItemCategory
)

router.get(
  '/system/getAllItemCategorybyId',
  categoryController.getItemCategoryById
)
router.post('/system/creOrUpdProductType', categoryController.ProductType)
router.get('/system/getAllProductType', categoryController.getAllProductType)

router.get('/system/getAllCategory', categoryController.getAllcategory)
router.get('/system/getAllListCategory', categoryController.getAllListCategory)

// CRUD BRAND

router.post('/system/createOrupdateBrand', brandController.createOrUpdate)
router.get('/system/getAllBrand', brandController.getAllBrands)
//  CRUD DISCOUNT
router.post(
  '/system/createOrUpdateDiscount',
  discountController.createOrUpdateDiscount
)
router.get('/system/getAllDiscount', discountController.getAllDiscount)

// CRUD PRODUCT

router.post('/system/createProduct', productController.createProduct)
router.get('/system/getAllProduct', productController.getAllProduct)
//  CRUD UI

router.post('/system/ui/createCarousel', manageUIController.createCarouselImage)
router.get('/system/ui/getImgCarousel', manageUIController.getCarouselImage)

export default router
