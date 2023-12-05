
// export const validateEmail = (email: string) => {

//     return true
// }



export const validatePassword = (password: string) => {
    const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    const checkValidatePass = regExp.test(password)

    return checkValidatePass
}