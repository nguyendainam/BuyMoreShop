import { v4 as uuidv4 } from 'uuid'
import { randomInterger } from '../../component/random.js'
import { saveImageToFolder } from '../../component/saveImage.js'
import { connectDB } from '../../connectDB/index.js'
import mssql from 'mssql'

const createProduct = product => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!product.ImageProduct || !product.Product || !product.Inventory) {
        resolve({
          err: -1,
          errMessage: 'Missing data required'
        })
      } else {
        const aboutProduct = JSON.parse(product.Product)
        const imageShow = JSON.parse(product.ImageProduct)
        const listInventory = JSON.parse(product.Inventory)



        // console.log(listInventory)
        
        const IdProduct = Date.now() + '@' + uuidv4()
        const nameVI = aboutProduct.nameVI
        const nameEN = aboutProduct.nameEN
        const category_Id = aboutProduct.category
        const brand_Id = aboutProduct.brand
        const discount_Id = aboutProduct.discount
        const descVI = aboutProduct.descVI
        const descEN = aboutProduct.descEN

        let pool = await connectDB()
        let saveProduct = await pool
          .request()
          .input('Id', mssql.VarChar, IdProduct)
          .input('NameVI', mssql.NVarChar, nameVI)
          .input('NameEN', mssql.VarChar, nameEN)
          .input('Category_Id', mssql.VarChar, category_Id)
          .input('Brand_Id', mssql.VarChar, brand_Id)
          .input('Discount_Id', mssql.Int, discount_Id)
          .input('DescVI', mssql.NVarChar, descVI)
          .input('DescEN', mssql.VarChar, descEN)
          .query(`INSERT INTO  Product(Id, NameVI, NameEN, Discount_Id , Category_Id, Brand_Id, DescVI, DescEN)
                        SELECT @Id, @NameVI , @NameEN ,@Discount_Id ,@Category_Id , @Brand_Id ,@DescVI, @DescEN
                        WHERE NOT EXISTS (SELECT 1 FROM Product as p WHERE p.Id = @Id  )
                    `)

        // If save product is successful then save Image show Product
        if (saveProduct.rowsAffected[0] === 1) {
          const typeImage = 'showProduct'
          let saveImageProduct = await Promise.all(
            imageShow.map(async image => {
              let nameImagePr = image.name
              let base64ImagePr = image.thumbUrl.split(';base64,').pop()
              const saveImagePr = await saveImageToFolder(
                base64ImagePr,
                nameImagePr,
                'product'
              )
              if (saveImagePr) {
                let resultImgPr = await pool
                  .request()
                  .input('TypeImage', mssql.VarChar, typeImage)
                  .input('Image', mssql.VarChar, saveImagePr)
                  .input('Id_Product', mssql.VarChar, IdProduct)
                  .query(
                    `INSERT INTO Image_Product (TypeImage, Image ,Id_Product) VALUES
                    (@TypeImage, @Image, @Id_Product)
                    `
                  )
               
              }
            })
          )

          let saveProductInventory = await Promise.all(
            listInventory.map(async item => {

                const IdInventory = Date.now() + 'I@' + uuidv4()
                const size = item.size
                const color = item.color
                const quantity = item.quantity
                const price = item.price
                const screenSizeOptions = item.screenSizeOptions
                const memoryOptions = item.memoryOptions
                const scanFrequency = item.scanFrequency
                const screenType = item.screenType

                let resultInventory = await pool.request().input()


                const Image = item.Image





            })


          )

         
       



        }

    

        resolve('oke')

        // let saveImage = await Promise.all(
        //     listInventory.map(async (item) => {
        //         const arrImage = item.Image;

        //         if (arrImage.length > 0) {
        //             const uploadedImages = await Promise.all(
        //                 arrImage.map(async (image) => {
        //                     let nameImage = image.name
        //                     let base64img = image.thumbUrl.split(';base64,').pop()
        //                     let save = await saveImageToFolder(base64img, nameImage, 'product')
        //                     console.log(save)
        //                     return save
        //                 })
        //             );

        //             return uploadedImages
        //         }
        //         return ['deo co anh']
        //     })
        // )
        // }
      }
    } catch (e) {
      reject(e)
    }
  })
}

export default {
  createProduct
}
