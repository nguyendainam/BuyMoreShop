import { getAllProduct } from "../services/product";

export interface IProductHomePage {
  productId: string;
  brand: string;
  nameVI: string;
  nameEn: string;
  image: string;
  price: object;
}

export const getAllProductHomePage = async () => {
  const getdata = await getAllProduct();
  const resultData: IProductHomePage[] = getdata.data.items.map((i) => ({
    productId: i.ProductId,
    brand: i.NameBrand,
    nameVI: i.NameVI,
    nameEn: i.NameEN,
    image: i.Image,
    price: JSON.parse(i.ProductInventory),
  }));

  return resultData;
};
