import React, {useState} from 'react';
import s from "./ProductPage.module.css";
import Slider from "../Slider/Slider";
import ColorMenu from "./ColorMenu";
import chairIcon from "../../../IMGS/chair.png";
import ProductCard from "../ProductCard/ProductCard";

//  product
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

function ProductPage({productData, prodId, addItemToCart, ...props}) {

    let [itemForCart, setItemForCart] = useState({
        product: prodId,
        photo: productData.images[0]? productData.images[0].pathArr[0] : chairIcon,
        name: productData.name,
        code: productData.code,
        mainColor: "none",
        pillColor: "none",
        count: 1,
        price: productData.price,   //  for sum
    });

    let [chosenPhotos, setChosenPhotos] = useState([]);

    let colors = productData.images.map(i => {
        return {_id: i._id, mainColor: i.mainColor, pillColor: i.pillColor}
    });

    const setColorsAndPhotos = (photosId) => {
        let photos = productData.images.filter(p => p._id === photosId);
        setItemForCart({
            ...itemForCart,
            mainColor: photos[0].mainColor, //  need to get index 0 because filter returns an array
            pillColor: photos[0].pillColor,
            photo: photos[0].pathArr[0]
        });
        setChosenPhotos(photos[0].pathArr.map(p => {
            return {src: p}
        }));
        //console.log(photos);
    }

    const resetColorsAndPhotos = () => {
        setItemForCart({
            ...itemForCart,
            photo: productData.images[0].pathArr[0],
            mainColor: "none",
            pillColor: "none",
        });
        setChosenPhotos([]);
    }

    const setCount = (count) => {
        setItemForCart({...itemForCart, count: count});
    }
    const onClickAddItemToCart = () => {
        addItemToCart(itemForCart);
    }

    let allImgs = [];
    for (let i = 0; i < productData.images.length; i++) {
        for (let t = 0; t < productData.images[i].pathArr.length; t++) {
            allImgs.push({src: productData.images[i].pathArr[t]});
        }
    }

    const onOrderSubmit =()=> {
        console.log(itemForCart);
        addItemToCart(itemForCart);
        props.history.push("/order");
    }


    return (<div>

            <div className={s.main_box}>

                <div className={s.gallery}>

                    <Slider photos={chosenPhotos.length < 1 ? allImgs : chosenPhotos}/>
                </div>

                <div className={s.info_box}>
                    <div className={s.nameDiv}>
                        <h2 className={s.name}>{productData.name}</h2>
                    </div>
                    <div className={s.price_box}>

                        {productData.oldPrice&&productData.oldPrice>0 && <span className={s.old_price}>{productData.oldPrice}</span>}
                        <span className={s.price} style={productData.oldPrice&&productData.oldPrice>0 && {color: "red"}} >{productData.price} </span><span> грн</span>
                    </div>

                    <div className={s.colors_div}>
                        <ColorMenu colors={colors} setColors={setColorsAndPhotos} reset={resetColorsAndPhotos}/>
                    </div>

                    <div className={s.orderInfo} >
                        <span>Count</span>
                        <input className={s.count_input} type="number" value={itemForCart.count} onChange={e => setCount(e.target.value)}/>
                        <p><span>Chosen mColor: </span>{itemForCart.mainColor}</p>
                        <p><span>Chosen pColor: </span>{itemForCart.pillColor}</p>
                    </div>

                    <button onClick={onClickAddItemToCart} className={s.toCart_btn} >Add to Cart</button>
                    <button onClick={onOrderSubmit} className={s.order_btn} >Order</button>

                </div>

            </div>


            <div className={s.extra_box}>

                <div className={s.features_list}>
                    <h2>Характеристики</h2>
                    {productData.features.map(f => {
                        return <p key={f.key}><span>{f.key}: </span>{f.value}</p>
                    })}
                </div>

                {productData.relatedProducts.length>0 &&
                <div className={s.related_products_div}>
                    <h2>Related Products</h2>
                    <div  className={s.products_pane} >
                    {productData.relatedProducts.map(p => {
                        return <ProductCard name={p.name} thumbnail={p.thumbnail} price={p.price} _id={p._id} lessSpace={true}/>
                    })}
                    </div>
                </div>
                }

                {productData.similarProducts.length>0 &&
                <div className={s.similar_products_div}>
                    <h2>Similar Products</h2>
                    <div className={s.products_pane} >
                        {productData.similarProducts.map(p => {
                            return <ProductCard name={p.name} thumbnail={p.thumbnail} price={p.price} _id={p._id} lessSpace={true}/>
                        })}
                    </div>
                </div>
                }

            </div>

        </div>
    );
}

export default ProductPage;