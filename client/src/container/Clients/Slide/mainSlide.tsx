import React from 'react'
import style from './mainSlide.module.scss'
import { Carousel } from 'antd';
export default function mainSlide() {
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
                        <div className={style.imageChild}>
                            Image
                        </div>
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
                <div className={style.itemCat}>
                    <div className={style.image}></div>
                    <div className={style.title}>Laptop</div>
                </div>
                <div className={style.itemCat}> </div>

                <div className={style.itemCat}> </div>

                <div className={style.itemCat}> </div>

                <div className={style.itemCat}> </div>

                <div className={style.itemCat}> </div>

                <div className={style.itemCat}> </div>

                <div className={style.itemCat}> </div>

                <div className={style.itemCat}> </div>

                <div className={style.itemCat}> </div>

                <div className={style.itemCat}> </div>





            </div>
        </>
    )
}
