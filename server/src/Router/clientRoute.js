import { Router } from 'express'
import UserController from '../controller/user/UserController.js'
import LoginController from '../controller/login/LoginController.js'
import { verifyAccessToken } from '../component/verifyToken.js'
const router = Router()

router.get('/user', UserController.getListUser)
router.post('/registerUser', UserController.RegisterUser)
router.post('/login', LoginController.LoginUser)

//  get AccessToken and return the information  User
router.get('/currentUser', verifyAccessToken, UserController.getCurrent)

export default router
