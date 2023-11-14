import UserServices from '../../services/user/UserServices.js'
let getListUser = async (req, res) => {
  try {
    return res.status(200).json({
      data: '1213123'
    })
  } catch (e) {
    console.log(e)
  }
}

let RegisterUser = async (req, res) => {
  try {
    let data = await UserServices.RegisterUserService(req.body)
    return res.status(200).json(data)
  } catch (e) {
    console.log(e)
    return res.status(400).json(e)
  }
}

let getCurrent = async (req, res) => {
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

export default {
  getListUser,
  RegisterUser,
  getCurrent
}
