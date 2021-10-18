import React from 'react';
import {NavLink} from "react-router-dom";
import s from "./ProductCard.module.css";
import chairIcon from "../../../IMGS/chair.png";
import sale from "../../../IMGS/ICONS/coupon_color.png";

function ProductCard({name, thumbnail, price, oldPrice, _id, lessSpace}) {

    return (<div>
        <NavLink to={"/products/"+_id} >
        <div className={s.section} style={lessSpace && {display: "block"}} >
            {oldPrice>0 && <div className={s.sale_icon_div} >
                    <img src={sale} alt="sale"/>
                </div>}
                <div className={s.imgPart} >
                    <img className={s.thumbnail} src={thumbnail? thumbnail : chairIcon} alt={"product"} />
                </div>
                <div className={s.infoPart} >
                    <p>{name}</p>
                    {oldPrice>0 && <p className={s.old_price} >{oldPrice} грн</p>}
                    <p style={oldPrice>0 ? {color: "red"}:null} >{price} грн</p>
                </div>
        </div>
        </NavLink>
        </div>
    );
}

export default ProductCard;
