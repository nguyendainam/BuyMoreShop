import { Router } from 'express'
import UserController from '../controller/user/UserController.js'
import LoginController from '../controller/login/LoginController.js'
import { verifyAccessToken, isAdmin } from '../component/verifyToken.js'
const router = Router()



router.post('/login', LoginController.LoginUser)
router.post('/logout', LoginController.LogOut)

//  get AccessToken and return the information  User
router.post('/registerUser', UserController.RegisterUser)
router.get('/currentUser', verifyAccessToken, UserController.getCurrentUser)
router.post('/refreshToken', UserController.refreshNewAccessToken)
router.get('/forgotPassword', UserController.forgotPassword)
router.post('/api/user/reset-password', UserController.resetNewPassword)
router.get('/api/updateUser', verifyAccessToken, UserController.UpdateUser)

//  
router.get('/system/getUsers', verifyAccessToken, isAdmin, UserController.getUsers)
router.get('/system/deleteUser', verifyAccessToken, isAdmin, UserController.DeleteUser)



export default router
