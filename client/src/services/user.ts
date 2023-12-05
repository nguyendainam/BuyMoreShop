import axios from "../until/axios";


export const changePassword = (data: FormData) => {
    return axios.post('/api/user/reset-password', data)
}