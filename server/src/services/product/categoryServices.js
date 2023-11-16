import path, { resolve } from 'path'
import { randomInterger } from '../../component/random.js'
import { connectDB } from '../../connectDB/index.js'
import mssql from 'mssql'
import { SaveImage, RemoveImage } from '../../component/saveImage.js'

const key = 'category'

//  LIST CATEGORY
const createOrUpdateItesmToList = (data, imageCategory) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.nameVI || !data.action) {
        resolve({
          err: 1,
          errMessage: 'Missing data required'
        })
      } else {
        if (data.action.toLowerCase() === 'create') {
          let Id = randomInterger()
          let nameVI = data.nameVI
          let nameEN = data.nameEN
          let saveImage = await SaveImage(imageCategory.image, key)
          let pool = await connectDB()
          let result = await pool
            .request()
            .input('Id', mssql.Int, Id)
            .input('nameVI', mssql.NVarChar, nameVI)
            .input('nameEN', mssql.VarChar, nameEN)
            .input('ImageCat', mssql.VarChar, saveImage).query(`
                        INSERT INTO ListCategory (idListCat, nameVI, nameEN, ImageCat)
                        SELECT @Id, @nameVI, @nameEN, @ImageCat
                        WHERE NOT EXISTS (
                            SELECT 1 
                            FROM ListCategory 
                            WHERE nameVI = @nameVI OR nameEN = @nameEN
                        )`)

          if (result.rowsAffected[0] === 1) {
            resolve({
              err: 0,
              errMessage: 'Create item category successfull'
            })
          } else if (result.rowsAffected[0] === 0) {
            resolve({
              err: 2,
              errMessage: 'Items đã tồn tại'
            })
            await RemoveImage(saveImage)
          } else
            resolve({
              err: 1,
              errMessage: 'Create new items failed'
            })
        } else if (data.action.toLowerCase() === 'update') {
          if (!data.Id || !data.nameEN || !data.nameVI) {
            resolve({
              err: 1,
              errMessage: 'Missing data required to update'
            })
          } else {
            const IdCategory = data.Id
            const pool = await connectDB()
            let checkExist = await pool.request()
              .query(`SELECT * FROM ListCategory 
                                    WHERE idListCat = '${IdCategory}'`)
            if (checkExist.rowsAffected[0] === 1) {
              let oldImage = checkExist.recordset[0].ImageCat
              let nameEN = data.nameEN
              let nameVI = data.nameVI
              let newImage = imageCategory
                ? await SaveImage(imageCategory.image, key)
                : oldImage

              let result = await pool
                .request()
                .input('nameVI', mssql.NVarChar, nameVI)
                .input('nameEN', mssql.VarChar, nameEN)
                .input('ImageCat', mssql.VarChar, newImage).query(`
                                        UPDATE ListCategory 
                                        SET nameVI = @nameVI , nameEN =@nameEN, ImageCat = @ImageCat
                                        WHERE idListCat = '${IdCategory}'
                                        AND
                                        NOT EXISTS (
                                            SELECT 1 FROM  ListCategory AS L WHERE (L.nameVI = @nameVI OR L.nameEN =@nameEN)
                                            AND L.idListCat <> '${IdCategory}'
                                       )`)

              if (result.rowsAffected[0] === 1) {
                resolve({
                  err: 0,
                  errMessage: 'Update Successfull'
                })
                if (imageCategory && oldImage) {
                  await RemoveImage(oldImage)
                }
              } else {
                resolve({
                  err: 2,
                  errMessage: 'Update failed'
                })
                if (imageCategory) {
                  await RemoveImage(newImage)
                }
              }
            } else {
              resolve({
                err: 2,
                errMessage: 'Not found Items'
              })
            }
          }
        }
      }
    } catch (e) {
      reject(e)
    }
  })
}

//  END LIST CATEGORY

//  ITEMS CATEGORY

const createOrUpdateCategory = data => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          err: -1,
          errMessage: 'Missing data required'
        })
      } else {
        if (data.action.toLowerCase() === 'create') {
          if (!data.nameVI || !data.nameEN || !data.IdListCat) {
            resolve({
              err: 1,
              errMessage: 'Missing data to create category'
            })
          } else {
            let pool = await connectDB()

            let result = await pool
              .request()
              .input('NameVI', mssql.NVarChar, data.nameVI)
              .input('NameEN', mssql.VarChar, data.nameEN)
              .input('IdListCat', mssql.Int, data.IdListCat).query(`
                    INSERT INTO Category (NameVI , NameEN, IdListCat)
                    SELECT @NameVI, @NameEN , @IdListCat
                    WHERE NOT EXISTS (
                        SELECT 1 FROM Category AS C
                        WHERE (C.NameVI = @NameVI OR C.NameEN = @NameEN)
                        AND C.IdListCat = @IdListCat
                    ) `)
            if (result.rowsAffected[0] === 1) {
              resolve({
                err: 0,
                errMessage: 'Create Category Success'
              })
            } else {
              resolve({
                err: 1,
                errMessage: 'Create Category Failed'
              })
            }
          }
        } else if (data.action.toLowerCase() === 'update') {
          if (!data.nameVI || !data.nameEN || !data.IdListCat || !data.Id) {
            resolve({
              err: -1,
              errMessage: 'Missing data required to update'
            })
          } else {
            const pool = await connectDB()
            let result = await pool
              .request()
              .input('NameVI', mssql.NVarChar, data.nameVI)
              .input('NameEN', mssql.VarChar, data.nameEN)
              .input('IdListCat', mssql.Int, data.IdListCat)
              .query(`UPDATE Category 
                      SET NameVI = @NameVI, NameEN = @NameEN, IdListCat =@IdListCat
                      WHERE Id  = ${data.Id}
                      AND 
                      NOT EXISTS(
                        SELECT 1 FROM Category AS C WHERE (C.NameVI = @NameVI OR C.NameEN = @NameEN)
                        AND C.IdListCat = '${data.IdListCat}'
                      ) `)
            if (result.rowsAffected[0] === 1) {
              resolve({
                err: 0,
                errMessage: 'Update successfully'
              })
            } else {
              resolve({
                err: 2,
                errMessage: 'Update failed'
              })
            }
          }
        }
      }
    } catch (e) {
      reject(e)
    }
  })
}

// END ITEMS CATEGORY

// ITEM CATEGORY

const createOrUpdateItemCategory = data => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          err: -1,
          errMessage: 'Missing data required'
        })
      } else {
        if (data.action.toLowerCase() === 'create') {
          if (!data.nameVI || !data.IdCategory) {
            resolve({
              err: -1,
              errMessage: 'Missing data required to create category'
            })
          } else {
            let IdItems = randomInterger()
            const pool = await connectDB()
            const result = await pool
              .request()
              .input('IdItem', mssql.Int, IdItems)
              .input('nameVI', mssql.NVarChar, data.nameVI)
              .input('nameEN', mssql.VarChar, data.nameEN)
              .input('IdCategory', mssql.Int, data.IdCategory)
              .query(
                `
                INSERT INTO ItemCategory (IdItem, nameVI, nameEN , Id_Category)
                SELECT @IdItem, @nameVI, @nameEN, @IdCategory
                WHERE NOT EXISTS (
                  SELECT  1 FROM ItemCategory AS I
                  WHERE (I.nameVI = @nameVI OR I.nameEN = @nameEN)
                  AND   I.Id_Category = @IdCategory
                  OR   I.IdItem = @IdItem
                )  
                `
              )

            if (result.rowsAffected[0] === 1) {
              resolve({
                err: 0,
                errMessage: 'Create Item Category Success'
              })
            } else {
              resolve({
                err: 1,
                errMessage: 'Create Item Category Failed'
              })
            }
          }
        } else if (data.action.toLowerCase() === 'update') {
          if (
            !data.IdItem ||
            !data.nameEN ||
            !data.nameVI ||
            !data.IdCategory
          ) {
            resolve({
              err: 1,
              errMessage: 'Missing data required to update'
            })
          } else {
            const pool = await connectDB()
            const result = await pool
              .request()
              .input('nameVI', mssql.NVarChar, data.nameVI)
              .input('nameEN', mssql.VarChar, data.nameEN)
              .input('IdCategory', mssql.Int, data.IdCategory)
              .query(
                `UPDATE ItemCategory 
                SET nameVI =  @nameVI, nameEN = @nameEN
                WHERE IdItem = '${data.IdItem}'
                AND 
                NOT EXISTS (
                  SELECT  1 FROM ItemCategory AS I
                  WHERE (I.nameVI = @nameVI OR I.nameEN = @nameEN)
                  AND   I.Id_Category = @IdCategory
                  
                )  
                `
              )
            if (result.rowsAffected[0] === 1) {
              resolve({
                err: 0,
                errMessage: 'Update ItemCategory successfully '
              })
            } else {
              resolve({
                err: 1,
                errMessage: 'Update ItemCategory failed'
              })
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
  createOrUpdateCategory,
  createOrUpdateItesmToList,
  createOrUpdateItemCategory
}
