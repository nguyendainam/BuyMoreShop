import { RemoveImage, SaveImage } from "../../component/saveImage.js"
import { connectDB } from "../../connectDB/index.js"
import mssql from 'mssql'
const key = 'brand'


const CreateOrUpdateBrand = (data, ImageBrand) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !data.action) {
                resolve({
                    err: -1,
                    errMessage: 'Missing data required'
                })
            } else {
                if (data.action.toLowerCase() === 'create') {
                    if (!data.NameBrand) {
                        resolve({
                            err: -1,
                            errMessage: 'Missing data required create brand'
                        })
                    } else {
                        const pool = await connectDB()
                        let imagePath = ImageBrand ? await SaveImage(ImageBrand.ImageBrand, key) : null
                        let result = await pool.request()
                            .input('NameBrand', mssql.NVarChar, data.NameBrand)
                            .input('ImageBrand', mssql.VarChar, imagePath)
                            .input('DescVI', mssql.NText, data.DescVI)
                            .input('DescEN', mssql.Text, data.DescEN)
                            .query(`
                                INSERT INTO Brands (NameBrand, ImageBrand, DescVI, DescEN)
                                SELECT @NameBrand , @ImageBrand ,@DescVI ,@DescEN
                                WHERE NOT EXISTS (
                                    SELECT 1 FROM Brands as B
                                    WHERE B.NameBrand = @NameBrand
                                )
                            `)

                        if (result.rowsAffected[0] === 1) {
                            resolve({
                                err: 0,
                                errMessage: 'Create new Brands Success'
                            })
                        } else {
                            resolve({
                                err: 1,
                                errMessage: 'create brands faild'
                            })

                            imagePath ? await RemoveImage(imagePath) : ''
                        }
                    }


                } else if (data.action.toLowerCase() === 'update') {
                    if (!data.Id || !data.NameBrand) {
                        resolve({
                            err: -1,
                            errMessage: 'Missing data required to update'
                        })
                    } else {
                        let IdBrand = data.Id
                        const pool = await connectDB()
                        const checkExist = await pool.request().query(`SELECT * FROM Brands 
                                        WHERE Id = '${IdBrand}' `)



                        if (checkExist.rowsAffected[0] === 1) {
                            let oldImage = checkExist.recordset[0].ImageBrand

                            let newImage = ImageBrand ? await SaveImage(ImageBrand.ImageBrand, key) : oldImage

                            let result = await pool.request()
                                .input('NameBrand', mssql.NVarChar, data.NameBrand)
                                .input('ImageBrand', mssql.VarChar, newImage)
                                .input('DescVI', mssql.NText, data.DescVI)
                                .input('DescEN', mssql.VarChar, data.DescEN)
                                .query(`UPDATE Brands 
                                        SET NameBrand =@NameBrand ,
                                            ImageBrand=@ImageBrand,
                                            DescVI = @DescVI,
                                            DescEN = @DescEN
                                        WHERE Id = '${IdBrand}'
                                        AND
                                        NOT EXISTS (
                                            SELECT 1 FROM Brands as B
                                            WHERE B.NameBrand = @NameBrand
                                        )
                                `)
                            if (result.rowsAffected[0] === 1) {
                                resolve({
                                    err: 0,
                                    errMessage: 'Update Successfull'
                                })
                                if (ImageBrand && oldImage) {
                                    RemoveImage(oldImage)
                                }
                            } else {
                                resolve({
                                    err: 2,
                                    errMessage: 'Update failed'
                                })
                                if (ImageBrand) {
                                    RemoveImage(newImage)
                                }
                            }

                        }




                    }

                }





            }




        } catch (e) {
            reject(e)
        }
    })
}




export default {
    CreateOrUpdateBrand
}