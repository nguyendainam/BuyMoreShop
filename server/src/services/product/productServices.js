import { v4 as uuidv4 } from 'uuid';
import { randomInterger } from '../../component/random.js';
const createProduct = (product, ListImg) => {
    return new Promise((resolve, reject) => {
        try {
            // if (product) {
            //     resolve({
            //         err: -1,
            //         errMessage: 'Missing data required to create product'
            //     })
            // } else {
            // // table Product
            // let IdProduct = uuidv4()
            // let NameVI = product.NameVI
            // let NameEN = product.NameEN
            // let Category_Id = product.Category_Id
            // let Brand_Id = product.Brand_Id
            // let Discount_Id = product.Discount_Id
            // console.log(ListImg)
            // let ListImage = []
            const ListImage = ListImg

            // let Inventory = []

            //  table Product_Inventory

            resolve(ListImage)







            // }
        } catch (e) {
            reject(e)
        }
    })


}





export default {
    createProduct,

}