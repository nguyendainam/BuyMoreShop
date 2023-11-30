import { Routes, Route } from 'react-router-dom'
import Home from './container/Clients/Home'
import PrivateRouter from './router/privateRouter'
import MainDashboard from './container/Dashboard/mainDashboard'
import './assets/style/style.module.scss'
import ClientRouter from './router/clientRouter'
import LoginUser from './container/Clients/Login/LoginUser'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<LoginUser />} />
        <Route element={<PrivateRouter />} >
          <Route path='/*' element={<ClientRouter />} />

        </Route>
        <Route element={<PrivateRouter adminOnly />}>
          <Route path='/system/*' element={<MainDashboard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
