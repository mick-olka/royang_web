import React from 'react';
import {NavLink} from "react-router-dom";
import s from "./ProductCard.module.css";
import chairIcon from "../../../IMGS/chair.png";
import {MainContextConsumer} from "../../../UTILS/mainContext";

function ProductCard({name, thumbnail, price, _id}) {

    return ( <MainContextConsumer>
            {context => (
        <NavLink to={"/products/"+_id} >
        <div className={s.section} >

                <div className={s.imgPart} >
                    <img className={s.thumbnail} src={thumbnail? context.apiURL+thumbnail : chairIcon} alt={"product"} />
                </div>
                <div className={s.infoPart} >
                    <p>{name}</p>
                    <p>{price}</p>
                </div>
        </div>
        </NavLink>
            )}
        </MainContextConsumer>
    );
}

export default ProductCard;
