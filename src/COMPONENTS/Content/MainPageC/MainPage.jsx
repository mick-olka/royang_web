import React, {useContext, useEffect} from 'react';
import s from "./MainPage.module.css";
import SectionsPane from "../SectionsPane/SectionsPane";
import MainSlider from "../Slider/MainSlider";
import PaginatorC from "../../Extra/Paginator/PaginatorC";
import {TextContext} from "../../../UTILS/text_context";

const MainPage = ({ products, setCurrentPageAC, getProducts}) => {

    // let pn = useLocation().pathname;
    const onPageChanged = (pageNumber) => {     //  WHEN RETURNED FROM SEARCH PAGE
            setCurrentPageAC(pageNumber);
            getProducts(pageNumber);
    }
    useEffect(()=> {
        onPageChanged(1);   //  For returning after search
    }, []);   // eslint-disable-line react-hooks/exhaustive-deps

    const text_blocks = useContext(TextContext);
    const main_page_text=text_blocks[1].text;
    const main_page_lower_text=text_blocks[2].text;

    return (
        <div className={s.mainPage}>

            <h3 className={s.main_page_text} >{main_page_text}</h3>
            <p className={s.main_page_lower_text} >{main_page_lower_text}</p>

            <MainSlider />

            <div>
                <SectionsPane products={products}/>

                <PaginatorC onPageChanged={onPageChanged}   />
            </div>

        </div>
    );
}

export default MainPage;