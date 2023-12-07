import React, { useEffect, useState } from "react";
import style from "./mainSlide.module.scss";
import { Carousel } from "antd";
import {
  AllProductType,
  ITypeProduct,
} from "../../../components/GetdataCategory";
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";
import { URL_SERVER_IMG } from "../../../until/enum";

export default function mainSlide() {
  const [dataTypeProduct, setDataTypeProduct] = useState<ITypeProduct[]>([]);

  const selector = useSelector((state) => state.system);

  const handleGetTypeProduct = async () => {
    const data = await AllProductType();
    setDataTypeProduct(data);
  };

  useEffect(() => {
    handleGetTypeProduct();
  });

  return (
    <>
      <div className={style.mainSlide}>
        <div className={style.itemSlide1}>
          <Carousel autoplay>
            <div>
              <div className={style.carouselItem}>Slide 1</div>
            </div>
            <div>
              <div className={style.carouselItem}>Slide 2</div>
            </div>
            <div>
              <div className={style.carouselItem}>Slide 3</div>
            </div>
            <div>
              <div className={style.carouselItem}>Slide 4</div>
            </div>
          </Carousel>
        </div>
        <div className={style.itemSlide2}>
          <div className={style.itemChild}>
            <div className={style.imageChild}>Image</div>
          </div>
          <div className={style.itemChild}>
            <Carousel autoplay slidesToShow={1}>
              <div className={style.imageChild}>
                <div>Image</div>
              </div>
              <div className={style.imageChild}>
                <div>Image</div>
              </div>

              <div className={style.imageChild}>
                <div>Image</div>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      <div className={style.Featured_categories}>
        {dataTypeProduct.length &&
          dataTypeProduct.map((item: ITypeProduct) => (
            <div className={style.itemCat} key={item.Id}>
              <div className={style.image}>
                <img
                  src={URL_SERVER_IMG + item.Image}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className={style.title}>
                {selector.language === "vi" ? item.nameVI : item.nameEN}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
