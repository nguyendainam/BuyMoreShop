import React, { useEffect, useState } from "react";
import style from "./mainFeatured.module.scss";
import {
  getAllProductHomePage,
  IProductHomePage,
} from "../../../../components/GetProduct";
import { URL_SERVER_IMG } from "../../../../until/enum";

export default function Featured() {
  const [dataProduct, setDataProduct] = useState<IProductHomePage[]>([]);

  const handleGetProduct = async () => {
    const data = await getAllProductHomePage();
    setDataProduct(data);
  };

  useEffect(() => {
    handleGetProduct();
  }, []);

  return (
    <div className={style.main}>
      <div className={style.formTitle}>
        <span className={style.title}>Các Sản Phẩm nổi bật</span>
      </div>

      <div className={style.allProduct}>
        {dataProduct.length &&
          dataProduct.map((item) => (
            <div className={style.itemProduct}>
              <div className={style.formImage}>
                <img
                  src={URL_SERVER_IMG + item.image}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className={style.nameProduct}> {item.brand} </div>
              <div className={style.formNameProduct}>{item.nameVI}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
