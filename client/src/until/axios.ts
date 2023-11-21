import axios from 'axios'
import { URL_SERVER } from './enum'

const instance = axios.create({
    baseURL: URL_SERVER
})

instance.interceptors.response.use(
    (reponse) => {
        const data = reponse;
        return data
    }
)

export default instance