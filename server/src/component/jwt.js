import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'

dotenv.config()

const generateAccessToken = (uid, role) => {
    return jwt.sign({ _id: uid, role }, process.env.JWT_SECRET, { expiresIn: '3d' })
}

const generateRefreshToken = (uid) => {
    return jwt.sign({ _id: uid }, process.env.JWT_SECRET, { expiresIn: '7d' })
}




export default { generateAccessToken, generateRefreshToken }