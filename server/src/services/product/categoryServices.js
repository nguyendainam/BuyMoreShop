import path, { resolve } from 'path'
import { randomInterger } from '../../component/random.js'
import { connectDB } from '../../connectDB/index.js'
import mssql from 'mssql'
import { saveImageToFolder } from '../../component/saveImage.js'

const key = 'category'

//  Category
const createOrUpdateCategory = data => {
  console.log(data.action)
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.NameVI || !data.action) {
        resolve({
          err: 1,
          errMessage: 'Missing data required'
        })
      } else {
        if (data.action === 'create') {
          let nameVI = data.NameVI
          let nameEN = data.NameEN
          let saveImage = ''
          if (data.Image) {
            const imageCategory = JSON.parse(data.Image)
            let nameImg = imageCategory[0].name
            let base64 = imageCategory[0].thumbUrl.split(';base64,').pop()
            saveImage = await saveImageToFolder(base64, nameImg, 'category')
          }

          let pool = await connectDB()
          let result = await pool
            .request()
            .input('nameVI', mssql.NVarChar, nameVI)
            .input('nameEN', mssql.VarChar, nameEN)
            .input('ImageCat', mssql.VarChar, saveImage).query(`
                        INSERT INTO Category ( nameVI, nameEN, ImageCat)
                        SELECT @nameVI, @nameEN, @ImageCat
                        WHERE NOT EXISTS (
                            SELECT 1
                            FROM Category
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
                                        UPDATE Category 
                                        SET nameVI = @nameVI , nameEN =@nameEN, ImageCat = @ImageCat
                                        WHERE Id = '${IdCategory}'
                                        AND
                                        NOT EXISTS (
                                            SELECT 1 FROM  Category AS L WHERE (L.nameVI = @nameVI OR L.nameEN =@nameEN)
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
const getAllCategoryServices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let pool = await connectDB()
      let listItemCategories = await pool
        .request()
        .query('SELECT * FROM Category')
      if (listItemCategories.recordset.length > 0) {
        resolve({
          err: 0,
          errMessage: 'Getting all categories successfully',
          items: listItemCategories.recordset
        })
      } else {
        resolve({
          err: 1,
          errMessage: 'Empty list'
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

/*
 *
 *
 *
 **
 *
 **
 **
 **
 ****
 */
//   List ItemCategory

const createOrUpdateItesmToList = data => {
  // console.log(data)
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          err: -1,
          errMessage: 'Missing data required'
        })
      } else {
        if (data.action.toLowerCase() === 'create') {
          if (!data.nameVI || !data.nameEN) {
            resolve({
              err: 1,
              errMessage: 'Missing data to create category'
            })
          } else {
            let pool = await connectDB()
            let Id = randomInterger().toString()
            let result = await pool
              .request()
              .input('idListCat', mssql.VarChar, Id)
              .input('NameVI', mssql.NVarChar, data.nameVI)
              .input('NameEN', mssql.VarChar, data.nameEN)
              .input('IdCat', mssql.Int, data.IdCat).query(`
                    INSERT INTO ListCategory (idListCat, NameVI , NameEN, IdCat)
                    SELECT @idListCat, @NameVI, @NameEN , @IdCat
                    WHERE NOT EXISTS (
                        SELECT 1 FROM ListCategory AS C
                        WHERE (C.NameVI = @NameVI OR C.NameEN = @NameEN)
                        AND C.IdCat = @IdCat
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
          if (!data.nameVI || !data.nameEN || !data.IdCat || !data.Id) {
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
              .input('IdCat', mssql.Int, data.IdCat).query(`UPDATE ListCategory 
                      SET NameVI = @NameVI, NameEN = @NameEN, IdCat =@IdCat
                      WHERE idListCat  = ${data.Id}
                      AND 
                      NOT EXISTS(
                        SELECT 1 FROM ListCategory AS C WHERE (C.NameVI = @NameVI OR C.NameEN = @NameEN)
                        AND C.IdCat = '${data.IdCat}'
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
          if (!data.nameVI || !data.Id_listCategory) {
            resolve({
              err: -1,
              errMessage: 'Missing data required to create category'
            })
          } else {
            let IdItems = randomInterger().toString()
            const pool = await connectDB()
            const result = await pool
              .request()
              .input('IdItemCat', mssql.Int, IdItems)
              .input('nameVI', mssql.NVarChar, data.nameVI)
              .input('nameEN', mssql.VarChar, data.nameEN)
              .input('IdListCat', mssql.Int, data.Id_listCategory)
              .query(
                `
                INSERT INTO ItemCategory (IdItemCat, nameVI, nameEN , IdListCat)
                SELECT @IdItemCat, @nameVI, @nameEN, @IdListCat
                WHERE NOT EXISTS (
                  SELECT  1 FROM ItemCategory AS I
                  WHERE (I.nameVI = @nameVI OR I.nameEN = @nameEN)
                  AND   I.IdListCat = @IdListCat
                  OR   I.IdItemCat = @IdItemCat
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
            !data.Id_listCategory
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
              .input('IdListCat', mssql.Int, data.Id_listCategory)
              .query(
                `UPDATE ItemCategory 
                SET nameVI =  @nameVI, nameEN = @nameEN
                WHERE IdItemCat = '${data.IdItem}'
                AND 
                NOT EXISTS (
                  SELECT  1 FROM ItemCategory AS I
                  WHERE (I.nameVI = @nameVI OR I.nameEN = @nameEN)
                  AND   I.IdListCat = @IdListCat
                  
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
  createOrUpdateItemCategory,
  getAllCategoryServices
}
