import React, {useState} from 'react';
import s from "./ProductPage.module.css";
import Slider from "../Slider/Slider";
import ColorMenu from "./ColorMenu";
import {value} from "yarn/lib/cli";

function ProductPage({productData, prodId}) {

    // let pr = useParams();
    // console.log(JSON.stringify(pr));
    let [count, setCount] = useState(1);

    console.log(productData);
    return (<div>

            <div className={s.main_box}>

                <div className={s.gallery} >
                    <div className={s.colors} >
                        <ColorMenu />
                    </div>
                    <Slider photos={productData.images}/>
                </div>

                <div className={s.info_box}>
                    <div className={s.nameDiv} >
                        <h2 className={s.name}>{productData.name}</h2>
                    </div>
                    <div className={s.price_box}>
                        <span className={s.price} >{productData.price}</span><span> grn</span>
                    </div>
                </div>

            </div>


            <div className={s.extra_box}>
                <input type="number" value={count} onChange={setCount(value)} />
                <button>Add to Cart</button>
                <button>Order</button>
            </div>

        </div>
    );
}

export default ProductPage;