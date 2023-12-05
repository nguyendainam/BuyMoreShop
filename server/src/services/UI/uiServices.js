import { RemoveImage, saveImageToFolder } from "../../component/saveImage.js";
import { connectDB } from "../../connectDB/index.js";
import mssql from "mssql";

const createCarouserServices = async (data) => {
  try {
    if (!data.ListImage) {
      return {
        err: -1,
        errMessage: "Missing data require",
      };
    }

    const arrImage = JSON.parse(data.ListImage);
    const pool = await connectDB();
    const isShow = 1;

    await Promise.all(
      arrImage.map(async (img) => {
        const nameImage = img.name;
        const base64ImagePr = img.thumbUrl.split(";base64,").pop();
        const saveImage = await saveImageToFolder(
          base64ImagePr,
          nameImage,
          "ImageCarousel"
        );

        if (saveImage) {
          const result = await pool
            .request()
            .input("Type", mssql.VarChar, data.typeImage)
            .input("Image", mssql.VarChar, saveImage)
            .input("IsShow", mssql.Bit, isShow).query(`
            INSERT INTO CarouselImage (Image, TypeImage, IsShow)
            VALUES (@Image, @Type, @IsShow)
          `);

          if (result.rowsAffected[0] === 0 || !result) {
            RemoveImage(saveImage);
          }
        } else {
          return {
            err: -1,
            errMessage: "Create image failed",
          };
        }
      })
    );
    // Close the database connection
    return {
      err: 0,
    };
  } catch (e) {
    // Log the error for debugging
    console.error("Error in createCarouserServices:", e);
    return {
      err: -1,
      errMessage: "An error occurred",
    };
  }
};

const getCarouselImageService = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let keyList = key
      if (!key) {
        keyList = 'All'
      }
      let pool = await connectDB()
      if (key.toLowerCase() === 'all') {
        let result = await pool.query(`SELECT * FROM  CarouselImage `)
        if (result.rowsAffected[0] > 0) {
          resolve({
            err: 0,
            errMessage: 'Get Data successfull',
            items: result.recordset
          })
        } else {
          resolve({
            err: 1,
            items: result.recordset
          })
        }
      } else {
        let result = await pool.query(`SELECT * FROM  CarouselImage WHERE  TypeImage = ${key} `)
        if (result.rowsAffected[0] > 0) {
          resolve({
            err: 0,
            errMessage: 'Get Data successfull',
            items: result.recordset
          })
        } else {
          resolve({
            err: 1,
            items: result.recordset
          })
        }
      }

    } catch (e) {
      reject(e);
    }
  });
};
export default {
  createCarouserServices,
  getCarouselImageService,
};
