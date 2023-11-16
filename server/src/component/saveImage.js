import { fileURLToPath } from 'url'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import fs from 'fs'

export const SaveImage = (data, key) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !key) {
                resolve({
                    err: -1,
                    errMessage: 'Missing data required to save Image'
                })
            } else {
                let newpath = __dirname + '../../../Images/' + key + '/'
                let file = data
                let filename = Date.now() + `_${key}` + '__' + data.name
                file.mv(`${newpath}${filename}`, (err, data) => {
                    if (err) resolve({ err: 1, err })
                    else {
                        const pathImage = key + '/' + filename
                        resolve(
                            pathImage
                        )

                    }
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

export const RemoveImage = (image) => {
    return new Promise((resolve, reject) => {
        try {
            if (!image) {
                resolve({
                    err: 1,
                    errMessage: 'missing data required to delete image'
                })
            } else {

                let newpath = __dirname + '../../../Images/' + image
                fs.unlink(newpath, err => {
                    if (err) {
                        resolve({
                            err: 1,
                            errMessage: 'No found image'
                        })
                    } else resolve({
                        err: 0,
                        errMessage: 'Delete Successfull'
                    })


                })


            }

        } catch (e) {
            reject(e)
        }
    })
}