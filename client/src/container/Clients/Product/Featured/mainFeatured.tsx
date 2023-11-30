import React from 'react'
import style from './mainFeatured.module.scss'
export default function Featured() {
    return (
        <div className={style.main}>
            <div className={style.formTitle}>
                <span className={style.title}>Các Sản Phẩm nổi bật</span>
            </div>

            <div className={style.allProduct}>
                <div className={style.itemProduct}>
                </div>
            </div>
        </div>
    )
}
