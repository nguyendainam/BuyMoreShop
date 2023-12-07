import jwt from 'jsonwebtoken'
import UserServices from '../../services/user/UserServices.js'

const RegisterUser = async (req, res) => {
  try {
    let data = await UserServices.RegisterUserService(req.body)
    return res.status(200).json(data)
  } catch (e) {
    console.log(e)
    return res.status(400).json(e)
  }
}

const getCurrentUser = async (req, res) => {
  const _id = req.user
  try {
    let data = await UserServices.getCurrentService(_id)
    delete data.dataUser.Password
    delete data.dataUser.UserID
    delete data.dataUser.RoleId
    return res.status(200).json(data)
  } catch (e) {
    console.log(e)
    return res.status(400).json(e)
  }
}

const refreshNewAccessToken = async (req, res) => {
  try {
    const cookie = req.cookies
    if (!cookie && !cookie.refresh_token)
      return res.status(400).json({
        err: -1,
        errMessage: 'No refresh Token in cookie'
      })
    // Check if the Token is still valid or not
    jwt.verify(
      cookie.refresh_token,
      process.env.JWT_SECRET,
      async (err, decode) => {
        if (err)
          return res.status(400).json({ err: 1, errMessage: 'Invalid Token' })
        //  if The token is still valid => check the Token with Database
        const data = await UserServices.refreshNewAccessTokenService(
          decode._id,
          cookie.refresh_token
        )
        return res.status(200).json(data)
      }
    )
  } catch (e) {
    return res.status(400).json(e)
  }
}

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.query
    if (!email)
      return res.status(400).json({
        err: -1,
        errMessage: 'Missing data required'
      })
    let result = await UserServices.forgotPasswordServices(email)
    return res.status(200).json(result)
  } catch (e) {
    console.log(e)
    return res.status(400).json(e)
  }
}


const resetNewPassword = async (req, res) => {
  try {
    const result = await UserServices.resetPasswordServices(req.body)
    return res.status(200).json(result)
  } catch (e) {
    return res.status(400).json(e)
  }
}


const getUsers = async (req, res) => {
  try {
    const result = await UserServices.getAllUsers()
    return res.status(200).json(result)
  } catch (e) {
    return res.status(400).json(e)
  }
}


const DeleteUser = async (req, res) => {
  try {
    const result = await UserServices.deleteUser(req.query.id)
    return res.status(200).json(result)
  } catch (e) {
    return res.status(400).json(e)
  }
}


const UpdateUser = async (req, res) => {
  try {
    const { _id } = req.user

    const result = await UserServices.updateUser(req.body, _id)
  } catch (e) {
    return res.status(400).json(e)
  }
}


export default {
  RegisterUser,
  getCurrentUser,
  refreshNewAccessToken,
  forgotPassword,
  getUsers,
  resetNewPassword,
  DeleteUser,
  UpdateUser
}
