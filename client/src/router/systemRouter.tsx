import { Route, Routes } from 'react-router-dom'
import Welcome from '../container/Dashboard/Welcome/welcome'
import Content from '../container/Dashboard/content/contentDashboard'
import Listproduct from '../container/Dashboard/product/Listproduct'
import AddProduct from '../container/Dashboard/product/AddProduct'
import CategoryProduct from '../container/Dashboard/category/CategoryProduct'

export default function SystemRouter () {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='content' element={<Content />} />
      <Route path='product' element={<Listproduct />} />
      <Route path='product/add' element={<AddProduct />} />
      <Route path='category' element={<CategoryProduct />} />
    </Routes>
  )
}
