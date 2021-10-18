import React, {useEffect} from 'react';
import s from "./MainPage.module.css";
import SectionsPane from "../SectionsPane/SectionsPane";
import MainSlider from "../Slider/MainSlider";
import PaginatorC from "../../extra/Paginator/PaginatorC";

const MainPage = ({ products, setCurrentPageAC, getProducts}) => {

    // let pn = useLocation().pathname;
    const onPageChanged = (pageNumber) => {     //  WHEN RETURNED FROM SEARCH PAGE
            setCurrentPageAC(pageNumber);
            getProducts(pageNumber);
    }
    useEffect(()=> {
        onPageChanged(1);   //  For returning after search
    }, []);   // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={s.mainPage}>

            <MainSlider />

            <div>
                <SectionsPane products={products}/>

                <PaginatorC onPageChanged={onPageChanged}   />
            </div>

        </div>
    );
}

export default MainPage;