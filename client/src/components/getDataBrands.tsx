import { getAllBrands } from '../services/product'

interface IItemBrands {
  nameBrand: string
  DescVI: string
  DescEN: string
  Image: string
  idBrand: string
}
export const getListBrand = async () => {
  const listItem = await getAllBrands()
  const ArrData = listItem.data.item
  let dataBrand: IItemBrands[] = []
  if (ArrData.length > 0) {
    dataBrand = ArrData.map(i => ({
      nameBrand: i.NameBrand,
      idBrand: i.IdBrand,
      Image: i.ImageBrand,
      DescVI: i.DescVI,
      DescEN: i.DescEN
    }))
  }

  return dataBrand
}
