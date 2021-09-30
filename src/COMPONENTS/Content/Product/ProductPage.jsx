import React, {useState} from 'react';
import s from "./ProductPage.module.css";
import Slider from "../Slider/Slider";
import ColorMenu from "./ColorMenu";

//     _id: doc._id,
//     name: doc.name,
//     code: doc.code,
//     price: doc.price,
//     oldPrice: doc.oldPrice,
//     images: images0,
//     features: doc.features,
//     relatedProducts: doc.relatedProducts,
//     similarProducts: doc.similarProducts,
//     thumbnail: link + doc.thumbnail,
//     types: doc.types,
//     url: link + "products/" + doc._id,

function ProductPage({productData, prodId, addItemToCart}) {

    //let [count, setCount] = useState(1);
    let [itemForCart, setItemForCart] = useState({
        _id: productData.name,
        photo: "",
        name: productData.name,
        code: productData.code,
        mainColor: "mainColor",
        pillColor: "pillColor",
        count: 1,
        sum: productData.price,
    });

    const setCount = (count) => {
        setItemForCart({...itemForCart, count: count});
    }
    const onClickAddItemToCart = () => {
        addItemToCart(itemForCart);
    }

    //  HERE CONTROL PHOTOS TO GIVE TO SLIDER
    let allImgs = [];
    for (let i=0; i<productData.images.length; i++) {
        for (let t=0; t<productData.images[i].pathArr.length; t++) {
            allImgs.push({src: productData.images[i].pathArr[t]});
        }
    }
        //
        // productData.images.map(item=>{
        // return item.pathArr.map(p=>{return p});
    // });
    console.log(allImgs);

    return (<div>

            <div className={s.main_box}>

                <div className={s.gallery} >
                    <div className={s.colors} >
                        <ColorMenu />
                    </div>
                    <Slider photos={allImgs}/>
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

                <div className={s.features} >
                    {productData.features.map(f=> {
                        return <p key={f.key} ><span>{f.key}: </span><span> {f.value}</span></p>
                    })}
                </div>

                <input type="number" value={itemForCart.count} onChange={e=>setCount(e.target.value)} />
                <button onClick={onClickAddItemToCart} >Add to Cart</button>
                <button>Order</button>
            </div>

        </div>
    );
}

export default ProductPage;