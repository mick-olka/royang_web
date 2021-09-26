import React from 'react';
import s from "../Product/ProductForm/ProductsList.module.css";

function ItemsList({items, deleteItems, ...props}) {
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

    let index = 0;
    let itemsList = items.map((item) => {
        let indexId;
        if (item._id) {indexId=item._id} else { indexId=index; index++} //  if we dont have id in item
        return <div key={indexId} className={s.item} >
                    <input id={indexId} className={s.checkBox}
                           type="checkbox" name="checkbox"
                           onMouseOver={() => handleCheckboxMouseOver(indexId)}
                           onClick={() => toggleChecked(indexId)} />
                    {props.children(item)}
                </div>
    });

    const deleteHandler = () => {
        deleteItems(arr);
    }

    return (
        <div>
            <div className={s.controlPane} >
                <button className={s.btn} onClick={uncheckAll} >CANCEL</button>
                <button className={s.btn} onClick={deleteHandler} >DELETE</button>
            </div>
            {itemsList}
        </div>
    );
}

export default ItemsList;