import React from 'react';
import s from "./ProductPage.module.css";
import Slider from "../Slider/Slider";

function ProductPage({productData, prodId}) {

    // let pr = useParams();
    // console.log(JSON.stringify(pr));

    console.log(productData);
    return (<div>
                <div>PRODUCT</div>
            <div className={s.main_box}>
            <h2 className={s.name} >{productData.name}</h2>
            <Slider photos={productData.images} />
            </div>
            <div className={s.info}>
                <p></p>
            </div>
        </div>
    );
}

export default ProductPage;