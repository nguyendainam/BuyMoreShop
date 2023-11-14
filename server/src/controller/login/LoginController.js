import { MaxDays } from '../../component/enum.js'
import LoginServices from '../../services/login/LoginServices.js'

let LoginUser = async (req, res) => {
  try {
    let data = await LoginServices.LoginUserServices(req.body)
    //  save refresh token in cookie
    res.cookie('refresh_token', data.refreshToken, {
      httpOnly: true,
      maxAge: MaxDays
    })
    delete data.refreshToken
    return res.status(200).json(data)
  } catch (e) {
    console.log(e)
    return res.status(400).json(e)
  }
}

export default {
  LoginUser
}
