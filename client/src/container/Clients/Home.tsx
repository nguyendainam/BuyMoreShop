import React from "react";
import Header from "./Header/Header";
import style from "./Home.module.scss";
import MainSlide from "./Slide/mainSlide";
import TabsProducts from "./Product/Tabs/Tabs";
import OutStanding from "./Product/OutStanding/main";
import Fotter from "./Footer/Fotter";
import Featured from "./Product/Featured/mainFeatured";
export default function Home() {
  return (
    <div className={style.mainHome}>
      <Header />

      <div className={style.mainView}>
        <MainSlide />
        <TabsProducts />
        <OutStanding />
        <Featured />

        <Fotter />
      </div>
    </div>
  );
}
