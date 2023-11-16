import { Router } from 'express'
import UserController from '../controller/user/UserController.js'
import LoginController from '../controller/login/LoginController.js'
import { verifyAccessToken } from '../component/verifyToken.js'
const router = Router()



router.post('/login', LoginController.LoginUser)
router.post('/logout', LoginController.LogOut)

//  get AccessToken and return the information  User
router.post('/registerUser', UserController.RegisterUser)
router.get('/currentUser', verifyAccessToken, UserController.getCurrentUser)
router.post('/refreshToken', UserController.refreshNewAccessToken)
router.get('/forgotPassword', UserController.forgotPassword)



export default router
