import React from 'react';
import {NavLink} from "react-router-dom";
import s from "./ProductCard.module.css";
import chairIcon from "../../../IMGS/chair.png";

function ProductCard({name, thumbnail, price, _id}) {

    return (<div>
        <NavLink to={"/products/"+_id} >
        <div className={s.section} >

                <div className={s.imgPart} >
                    <img className={s.thumbnail} src={thumbnail? thumbnail : chairIcon} alt={"product"} />
                </div>
                <div className={s.infoPart} >
                    <p>{name}</p>
                    <p>{price}</p>
                </div>
        </div>
        </NavLink>
        </div>
    );
}

export default ProductCard;
