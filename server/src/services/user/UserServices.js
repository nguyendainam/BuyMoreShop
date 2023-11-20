import mssql from 'mssql'
import { connectDB } from '../../connectDB/index.js'
import { v4 as uuidv4 } from 'uuid'
import {
  checkPasswordUser,
  validateEmail,
  hashUserPassword
} from '../../component/checkInformation.js'
import jwt from '../../component/jwt.js'
import { createPasswordChangeToken } from '../../component/random.js'
import moment from 'moment/moment.js'
import sendEmail from '../../component/formemail.js'
import { fomatForgetPassword } from '../../until/formHtml.js'

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
          let UpdatedAt = new Date()
          let saveUser = await pool
            .request()
            .input('UserId', mssql.VarChar, UserId)
            .input('UserName', mssql.VarChar, UserName)
            .input('Password', mssql.VarChar, Password)
            .input('Email', mssql.VarChar, Email)
            .input('RoleId', mssql.VarChar, RoleId)
            .input('Gender', mssql.VarChar, Gender)
            .input('IsActive', mssql.Bit, IsActive)
            .input('CreatedAt', mssql.DateTime, CreatedAt)
            .input('UpdatedAt', mssql.DateTime, UpdatedAt).query(`
                        INSERT INTO Users (UserId, UserName, Password, Email, RoleId, Gender, IsActive, CreatedAt ,UpdatedAt)
                        SELECT 
                            @UserId, @UserName, @Password, @Email, @RoleId, @Gender, @IsActive, @CreatedAt,@UpdatedAt
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

const refreshNewAccessTokenService = (id, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let pool = await connectDB()
      let result = await pool.request().query(
        `
      SELECT S.* , U.RoleId 
      FROM UserSessions  as S
      JOIN Users AS U ON U.UserID  = S.UserID
      WHERE  
      S.UserID = '${id}' AND S.Token = '${token}' `
      )

      console.log(result.recordset)

      if (result.rowsAffected[0] === 1) {
        const roleUser = result.recordset[0].RoleId
        const newAccessToken = await jwt.generateAccessToken(id, roleUser)
        if (newAccessToken)
          resolve({
            err: 0,
            errMessage: 'Create new AccessToken Successfull',
            newAccessToken
          })

        resolve({
          err: 1,
          errMessage: 'Create new AccessToken Failed'
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

const forgotPasswordServices = email => {
  return new Promise(async (resolve, reject) => {
    try {
      const getToken = createPasswordChangeToken()
      const pool = await connectDB()
      const validateExpries = moment(getToken.passwordResetExpires).format(
        'YYYY-MM-DD HH:mm:ss.SSS'
      )
      let result = await pool
        .request()
        .input('ResetToken', mssql.VarChar, getToken.passwordResetToken)
        .input('ResetTokenExpries', mssql.DateTime, validateExpries)
        .query(`UPDATE Users
                SET ResetToken = @ResetToken , ResetTokenExpries =  @ResetTokenExpries
                WHERE Email = '${email}'

        `)

      if (result.rowsAffected[0] === 1) {
        let datacontent = {
          language: 'en',
          token: getToken.resetToken
        }
        const html = fomatForgetPassword(datacontent)
        let data = await sendEmail(email, html)

        if (data.messageId) {
          resolve({
            err: 0,
            errMessage: 'Request send successful'
          })
        } else {
          resolve({
            err: 2,
            errMessage: 'Request send failed'
          })

          await pool.request().query(`UPDATE Users
                  SET ResetToken = NULL , ResetTokenExpries =  NNULL
                  WHERE Email = '${email}'
          `)
        }
      }
    } catch (e) {
      reject(e)
    }
  })
}

export default {
  RegisterUserService,
  getCurrentService,
  refreshNewAccessTokenService,
  forgotPasswordServices
}
