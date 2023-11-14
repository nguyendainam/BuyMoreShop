import mssql from 'mssql'
import { connectDB } from '../../connectDB/index.js'
import { v4 as uuidv4 } from 'uuid'
import {
  checkPasswordUser,
  validateEmail,
  hashUserPassword
} from '../../component/checkInformation.js'

let RegisterUserService = data => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.Email | !data.Password) {
        resolve({
          err: -1,
          errMessage: 'Missing data required'
        })
      } else {
        let checkEmail = validateEmail(data.Email)
        let checkValidatePass = checkPasswordUser(data.Password)
        if (!checkEmail | !checkValidatePass) {
          resolve({
            err: 1,
            errMessage: 'Email or Password is not validate'
          })
        } else {
          let pool = await connectDB()
          let UserId = uuidv4()
          let UserName = data.UserName
          let Email = data.Email
          let Password = await hashUserPassword(data.Password)
          let RoleId = data.RoleId
          let Gender = data.Gender
          let IsActive = data.IsActive ? data.IsActive : 1
          let CreatedAt = new Date()
          let saveUser = await pool
            .request()
            .input('UserId', mssql.VarChar, UserId)
            .input('UserName', mssql.VarChar, UserName)
            .input('Password', mssql.VarChar, Password)
            .input('Email', mssql.VarChar, Email)
            .input('RoleId', mssql.VarChar, RoleId)
            .input('Gender', mssql.VarChar, Gender)
            .input('IsActive', mssql.Bit, IsActive)
            .input('CreatedAt', mssql.DateTime, CreatedAt).query(`
                        INSERT INTO Users (UserId, UserName, Password, Email, RoleId, Gender, IsActive, CreatedAt)
                        SELECT 
                            @UserId, @UserName, @Password, @Email, @RoleId, @Gender, @IsActive, @CreatedAt
                        WHERE NOT EXISTS (
                            SELECT 1 FROM Users WHERE Email = @Email
                        );
                        `)

          if (saveUser.rowsAffected && saveUser.rowsAffected[0] > 0) {
            resolve({
              err: 0,
              errMessage: 'Create User Success'
            })
          } else {
            resolve({
              err: 1,
              errMessage: 'Create User Failed'
            })
          }
        }
      }
    } catch (e) {
      reject(e)
    }
  })
}

let getCurrentService = data => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data._id) {
        resolve({
          err: -1,
          errMessage: 'Missing data required'
        })
      } else {
        let pool = await connectDB()
        let IdUser = data._id
        let result = await pool
          .request()
          .query(`SELECT * FROM Users WHERE UserID = '${IdUser}'`)
        if (result.rowsAffected[0] > 0) {
          resolve({
            dataUser: result.recordset[0]
          })
        } else {
          resolve({
            err: 1,
            errMessage: 'No users found'
          })
        }
      }
    } catch (e) {
      reject(e)
    }
  })
}

export default {
  RegisterUserService,
  getCurrentService
}
