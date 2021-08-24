import React from 'react';
import s from "../Product/ProductForm/ProductsList.module.css";
import {NavLink} from "react-router-dom";
import {MainContextConsumer} from "../../../UTILS/mainContext";
import chairIcon from "../../../IMGS/chair.png";

function ProductsList({products, deleteProducts}) {
    let isMouseDown = false;
    document.body.onmousedown = () => {isMouseDown = true}
    document.body.onmouseup = () => {isMouseDown = false}

    let arr = [];
    let isChecked = (id) => {return document.getElementById(id).checked};
    const toggleChecked = (id) => {
        if (isChecked(id)) arr.push(id);
        else {
            let index = arr.indexOf(id);
            if (index !== -1) arr.splice(index, 1);
        }
        console.log(arr);
    }

    const handleCheckboxMouseOver = (id) => {
        if (isMouseDown) {
            document.getElementById(id).checked = !isChecked(id);
            toggleChecked(id);
        }
    }

    const uncheckAll = () => {
        let checkboxes = document.getElementsByName("checkbox");
        for(let i=0; i<checkboxes.length; i++)
            checkboxes[i].checked=false;
        arr=[];
    }

    let productsList = products.map((p) => {
        return <MainContextConsumer key={p._id} >
            {context => (
        <div className={s.item} >
            <input id={p._id} className={s.checkBox}
                   type="checkbox" name="checkbox"
                   onMouseOver={() => handleCheckboxMouseOver(p._id)}
                   onClick={() => toggleChecked(p._id)}
            />

            <div className={s.imgBox}>
                <img className={s.thumbnail} src={p.thumbnail? context.apiURL+p.thumbnail : chairIcon} alt="img"/>
            </div>
            <p><NavLink to={"/admin/products/" + p._id}>{p.name}</NavLink></p>
            <p>$ {p.price}</p>
        </div>
            )}
        </MainContextConsumer>
    });

    const deleteHandler = () => {
        deleteProducts(arr);
    }

    return (
        <div>
            <div className={s.controlPane} >
                <button className={s.btn} onClick={uncheckAll} >CANCEL</button>
                <button className={s.btn} onClick={deleteHandler} >DELETE</button>
            </div>
            {productsList}
        </div>
    );
}

export default ProductsList;