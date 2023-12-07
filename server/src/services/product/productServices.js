import { v4 as uuidv4 } from "uuid";
import { RemoveImage, saveImageToFolder } from "../../component/saveImage.js";
import { connectDB } from "../../connectDB/index.js";
import mssql from "mssql";

const createProduct = async (product) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!product.ImageProduct || !product.Product || !product.Inventory) {
        return {
          err: -1,
          errMessage: "Missing data required",
        };
      }
      const aboutProduct = JSON.parse(product.Product);
      const imageShow = JSON.parse(product.ImageProduct);
      const listInventory = JSON.parse(product.Inventory);
      const IdProduct = Date.now() + "@" + uuidv4();
      const nameVI = aboutProduct.nameVI;
      const nameEN = aboutProduct.nameEN;
      const category_Id = aboutProduct.category.join(",");
      const brand_Id = aboutProduct.brand;
      const discount_Id = aboutProduct.discount;
      const descVI = aboutProduct.descVI;
      const descEN = aboutProduct.descEN;

      const pool = await connectDB();
      const transaction = new mssql.Transaction(pool);
      await transaction.begin();
      try {
        const saveProduct = await pool
          .request()
          .input("Id", mssql.VarChar, IdProduct)
          .input("NameVI", mssql.NVarChar, nameVI)
          .input("NameEN", mssql.VarChar, nameEN)
          .input("Category_Id", mssql.VarChar, category_Id)
          .input("Brand_Id", mssql.VarChar, brand_Id)
          .input("Discount_Id", mssql.Int, discount_Id)
          .input("DescVI", mssql.NVarChar, descVI)
          .input("DescEN", mssql.VarChar, descEN).query(`
    INSERT INTO Product(Id, NameVI, NameEN, Discount_Id, Category_Id, Brand_Id, DescVI, DescEN)
    SELECT @Id, @NameVI, @NameEN, @Discount_Id, @Category_Id, @Brand_Id, @DescVI, @DescEN
    WHERE NOT EXISTS (
        SELECT 1 
        FROM Product as p 
        WHERE 
            (p.NameVI = @NameVI
            AND p.NameEN = @NameEN
            AND p.Brand_Id = @Brand_Id
            AND p.Category_Id = @Category_Id)
            AND p.Id <> @Id
    )`);

        if (saveProduct.rowsAffected[0] === 1) {
          const typeImage = "showProduct";

          await Promise.all(
            imageShow.map(async (image) => {
              const nameImagePr = image.name;
              const base64ImagePr = image.thumbUrl.split(";base64,").pop();
              const saveImagePr = await saveImageToFolder(
                base64ImagePr,
                nameImagePr,
                "product"
              );

              if (saveImagePr) {
                let resultSaveImg = await pool
                  .request()
                  .input("TypeImage", mssql.VarChar, typeImage)
                  .input("Image", mssql.VarChar, saveImagePr)
                  .input("Id_Product", mssql.VarChar, IdProduct).query(`
                  INSERT INTO Image_Product (TypeImage, Image, Id_Product)
                  VALUES (@TypeImage, @Image, @Id_Product)
                `);

                if (resultSaveImg.rowsAffected[0] === 0) {
                  RemoveImage(saveImagePr);
                }
              }
            })
          );

          await Promise.all(
            listInventory.map(async (item) => {
              const IdInventory = Date.now() + "I@" + uuidv4();

              const resultInventory = await pool
                .request()
                .input("Id", mssql.VarChar, IdInventory)
                .input("Id_Product", mssql.VarChar, IdProduct)
                .input("Size", mssql.VarChar, item.size)
                .input("Color", mssql.VarChar, item.color)
                .input("Quantity", mssql.Int, item.quantity)
                .input("Price", mssql.Decimal, item.price)
                .input("screenSize", mssql.VarChar, item.screenSizeOptions)
                .input("memory", mssql.VarChar, item.memoryOptions)
                .input("scanFrequency", mssql.VarChar, item.scanFrequency)
                .input("screenType", mssql.VarChar, item.screenType).query(`
                INSERT INTO Product_Inventory (Id, Id_Product, Size, Color, Quantity, Price,
                  screenSize, memory, scanFrequency, screenType)
                SELECT 
                  @Id, @Id_Product, @Size, @Color, @Quantity, @Price,
                  @screenSize, @memory, @scanFrequency, @screenType
                WHERE NOT EXISTS (
                  SELECT 1 
                  FROM Product_Inventory 
                  WHERE 
                    Id_Product = @Id_Product AND
                    Size = @Size AND
                    Color = @Color AND
                    Quantity = @Quantity AND
                    Price = @Price AND
                    screenSize = @screenSize AND
                    memory = @memory AND
                    scanFrequency = @scanFrequency AND
                    screenType = @screenType
                )
              `);

              if (resultInventory.rowsAffected[0] === 1) {
                const typeImage = "Inventory_Product";

                await Promise.all(
                  item.Image.map(async (itemImg) => {
                    const nameImagePr = itemImg.name;
                    const base64ImagePr = itemImg.thumbUrl
                      .split(";base64,")
                      .pop();
                    const saveImagePr = await saveImageToFolder(
                      base64ImagePr,
                      nameImagePr,
                      "product"
                    );

                    if (saveImagePr) {
                      const resultsaveImage = await pool
                        .request()
                        .input("TypeImage", mssql.VarChar, typeImage)
                        .input("Image", mssql.VarChar, saveImagePr)
                        .input("Product_Inventory", mssql.VarChar, IdInventory)
                        .query(`
                        INSERT INTO Image_Product (TypeImage, Image, Product_Inventory)
                        VALUES (@TypeImage, @Image, @Product_Inventory)
                      `);

                      if (resultsaveImage.rowsAffected[0] === 0) {
                        RemoveImage(saveImagePr);
                      }
                    }
                  })
                );
              }
            })
          );
        } else {
          await transaction.rollback();
          resolve({
            err: -1,
            errMessage: "Product already exists",
          });
        }
        await transaction.commit();
        resolve({
          err: 0,
          errMessage: "create Product success",
        });
      } catch (error) {
        await transaction.rollback();
        console.error(error);
        return {
          err: -1,
          errMessage: "An error occurred",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        err: -1,
        errMessage: "An error occurred",
      };
    }
  });
};

const getAllProductServices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let pool = await connectDB();
      let result = await pool.query(`
        SELECT
          P.Id AS ProductId,
          P.NameVI,
          P.NameEN,
          B.NameBrand,
          I.Image,
          (
            SELECT
            PI.Price 
            FROM Product_Inventory AS PI
            WHERE PI.Id_Product = P.Id
            FOR JSON PATH
          ) AS ProductInventory
        FROM Product AS P
        JOIN Image_Product AS I ON I.Id_Product = P.Id
        JOIN Brands AS B ON B.IdBrand = P.Brand_Id
        ORDER BY P.Id
        OFFSET 0 ROWS
        FETCH NEXT 50 ROWS ONLY;
        
        `);
    
      resolve({
        err: 0,
        items: result.recordset,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  createProduct,
  getAllProductServices,
};
