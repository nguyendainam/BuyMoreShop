import React from 'react'
import Header from './Header/Header'
import style from './Home.module.scss'
export default function Home () {
  return (
    <div className={style.mainHome}>
      <Header />

      <div className={style.mainView}>Main VIEW</div>
    </div>
  )
}
