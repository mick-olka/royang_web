import React, {useState} from 'react';
import s from "./ProductPage.module.css";
import Slider from "../Slider/Slider";
import ColorMenu from "./ColorMenu";
import chairIcon from "../../../IMGS/chair.png";
import ProductCard from "../ProductCard/ProductCard";
import SectionsPane from "../SectionsPane/SectionsPane";

function ProductPage({productData, prodId, addItemToCart, ...props}) {

    let [itemForCart, setItemForCart] = useState({
        product: prodId,
        photo: productData.images[0]? productData.images[0].pathArr[0] : chairIcon,
        name: productData.name,
        code: productData.code,
        mainColor: "не вибрано",
        pillColor: "не вибрано",
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
    }

    const resetColorsAndPhotos = () => {
        setItemForCart({
            ...itemForCart,
            photo: productData.images[0].pathArr[0],
            mainColor: "не вибрано",
            pillColor: "не вибрано",
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

                        {productData.oldPrice>0 ? <span className={s.old_price}>{productData.oldPrice}</span> : null}
                        <span className={s.price} style={productData.oldPrice>0 ? {color: "red"}: null} >{productData.price} </span><span> грн</span>
                    </div>

                    <div className={s.colors_div}>
                        <ColorMenu colors={colors} setColors={setColorsAndPhotos} reset={resetColorsAndPhotos}/>
                    </div>

                    <div className={s.orderInfo} >
                        <span>Кількість</span>
                        <input className={s.count_input} type="number" min="1" value={itemForCart.count} onChange={e => setCount(e.target.value)}/>
                        <p><span>Колір каркасу: </span>{itemForCart.mainColor || "не вибрано"}</p>
                        <p><span>Колір тканини: </span>{itemForCart.pillColor || "не вибрано"}</p>
                    </div>

                    {/*<button onClick={onClickAddItemToCart} className={s.toCart_btn} >Додати в кошик</button>*/}
                    <button onClick={onOrderSubmit} className={s.order_btn} >Замовити</button>
                    <p>Або подзвоніть менеджеру щоб замовити*</p>

                </div>

            </div>


            <div className={s.extra_box}>

                <div className={s.features_list}>
                    <h2>Характеристики</h2>
                    {productData.features && productData.features.map(f => {
                        return <p key={f.key}>{f.key} : <span>{f.value}</span></p>
                    })}
                </div>
                <br/><br/>

                { productData.description && <div className={s.description_div} >
                    <h3 style={{fontSize: "1.2rem", fontWeight: "bolder"}} >Опис:</h3>
                    <div className={s.description}>
                        {productData.description.split("\n").map(p=>{return <p key={Math.random()*10} style={{margin: "1rem"}} >{p}</p>})}
                    </div>
                </div> }

                {productData.relatedProducts.length>0 &&
                <div className={s.related_products_div}>
                    <h2>Пов'язані товари</h2>
                    <SectionsPane products={productData.relatedProducts}/>
                </div>
                }

                {productData.similarProducts.length>0 &&
                <div className={s.similar_products_div}>
                    <h2>Схожі товари</h2>
                    <SectionsPane products={productData.similarProducts}/>
                </div>
                }

            </div>

        </div>
    );
}

export default ProductPage;