import { Routes, Route } from 'react-router-dom'
import Home from './container/Clients/Home'
import PrivateRouter from './router/privateRouter'
import MainDashboard from './container/Dashboard/mainDashboard'
import './assets/style/style.module.scss'
function App () {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<PrivateRouter adminOnly />}>
          <Route path='/system/*' element={<MainDashboard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
