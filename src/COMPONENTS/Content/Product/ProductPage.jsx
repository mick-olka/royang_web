import React, {useState} from 'react';
import s from "./ProductPage.module.css";
import Slider from "../Slider/Slider";
import ColorMenu from "./ColorMenu";

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
        photo: productData.images[0].pathArr[0],
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
                    <div className={s.colors}>
                        <ColorMenu colors={colors} setColors={setColorsAndPhotos} reset={resetColorsAndPhotos}/>
                    </div>
                    <Slider photos={chosenPhotos.length < 1 ? allImgs : chosenPhotos}/>
                </div>

                <div className={s.info_box}>
                    <div className={s.nameDiv}>
                        <h2 className={s.name}>{productData.name}</h2>
                    </div>
                    <div className={s.price_box}>
                        <span className={s.price}>{productData.price}</span><span> grn</span>
                    </div>
                </div>

            </div>


            <div className={s.extra_box}>

                <div className={s.features}>
                    {productData.features.map(f => {
                        return <p key={f.key}><span>{f.key}: </span><span> {f.value}</span></p>
                    })}
                </div>

                <div className={s.orderInfo} >
                    <p><span>Chosen mColor: </span>{itemForCart.mainColor}</p>
                    <p><span>Chosen pColor: </span>{itemForCart.pillColor}</p>
                </div>

                <input type="number" value={itemForCart.count} onChange={e => setCount(e.target.value)}/>
                <button onClick={onClickAddItemToCart} >Add to Cart</button>
                <button onClick={onOrderSubmit} >Order</button>
            </div>

        </div>
    );
}

export default ProductPage;