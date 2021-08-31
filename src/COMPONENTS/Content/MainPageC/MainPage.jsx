import React from 'react';
import s from "./MainPage.module.css";
import SectionsPane from "../SectionsPaneC/SectionsPane";
import SlickSlider from "../Slider/SlickSlider";

const MainPage=(props)=>{

    return (
        <div className={s.mainPage} >
            <h1>MAIN PAGE</h1>

            <SlickSlider />

            <SectionsPane products={props.products} />
        </div>
    );
}

export default MainPage;