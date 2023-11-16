import crypto from 'crypto'
export const randomInterger = () => {
  const min = Math.pow(10, 8)
  const max = Math.pow(10, 9) - 1
  return Math.floor(Math.random() * (max - min + 1) + min)
}



export const createPasswordChangeToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex')
  const passwordResetToken = crypto.createHash('SHA256').update(resetToken).digest('hex')
  return ({
    resetToken,
    passwordResetToken
  })
}
