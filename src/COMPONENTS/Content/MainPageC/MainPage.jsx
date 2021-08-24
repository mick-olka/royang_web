import React from 'react';
import s from "./MainPage.module.css";
import Slider from "../Slider/Slider";
import SectionsPane from "../SectionsPaneC/SectionsPane";

const MainPage=(props)=>{

    return (
        <div className={s.mainPage} >
            <h1>MAIN PAGE</h1>

            <Slider />

            <SectionsPane products={props.products} />
        </div>
    );
}

export default MainPage;