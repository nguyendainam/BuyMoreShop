import { Route, Routes } from 'react-router-dom'
import Welcome from '../container/Dashboard/Welcome/welcome'
import Content from '../container/Dashboard/content/contentDashboard'
import Listproduct from '../container/Dashboard/product/Listproduct'
import AddProduct from '../container/Dashboard/product/AddProduct'
import CategoryProduct from '../container/Dashboard/category/CategoryProduct'
import ItemCategory from '../container/Dashboard/category/ItemCategory'
import ListCategory from '../container/Dashboard/category/ListCategory'
import Brand from '../container/Dashboard/brand/Brand'
import ListBrand from '../container/Dashboard/brand/ListBrand'
import Discount from '../container/Dashboard/discount/Discount'
import ManageCarousel from '../container/Dashboard/manageUI/List_Carousel/manageCarousel'
import ProductType from '../container/Dashboard/category/ProductType'

export default function SystemRouter() {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='content' element={<Content />} />
      <Route path='product' element={<Listproduct />} />
      <Route path='product/add' element={<AddProduct />} />
      <Route path='category' element={<CategoryProduct />} />
      <Route path='listCategory' element={<ListCategory />} />
      <Route path='itemCategory' element={<ItemCategory />} />
      <Route path='brand' element={<Brand />} />
      <Route path='listbrand' element={<ListBrand />} />
      <Route path='discount' element={<Discount />} />
      <Route path='manage-carousel' element={<ManageCarousel />} />
      <Route path='productType' element={<ProductType />} />
    </Routes>
  )
}
