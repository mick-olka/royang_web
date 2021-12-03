import React, {useEffect} from 'react';
import s from "./ItemsList.module.css";
import {useSmallPopup} from "../../../hooks/small_popup.hook";

function ItemsList({items, deleteItems, itemsIdsArr, setItemsIdArr, ...props}) {
    let isMouseDown = false;
    document.body.onmousedown = () => {isMouseDown = true}
    document.body.onmouseup = () => {isMouseDown = false}

    const showSmallPopup = useSmallPopup();

    const uncheckAll = () => {
        setItemsIdArr([]);
    }

    useEffect(()=>{
        setItemsIdArr([]);
    }, [setItemsIdArr]);

    useEffect(()=> {
        for (let i = 0; i < items.length; i++) {
            document.getElementById(items[i]._id).checked = itemsIdsArr.indexOf(items[i]._id) !== -1;
        }
        showSmallPopup(itemsIdsArr.length + " items");
    }, [items, itemsIdsArr]);

    const onCheckboxClick = (id) => {
        let index = itemsIdsArr.indexOf(id);
        if (index !== -1) {    //  if available
            let arrCopy = [...itemsIdsArr];
            arrCopy.splice(index, 1);
            setItemsIdArr([...arrCopy]);
            document.getElementById(id).checked = false;
        } else {
            setItemsIdArr([...itemsIdsArr, id]);
            document.getElementById(id).checked = true;
        }
    }

    const handleCheckboxMouseOver = (id) => {
        if (isMouseDown) {
            onCheckboxClick(id);
        }
    }

    let itemsList = items.map((item) => {
        let indexId=item._id;

        return <div key={indexId} className={s.item} >
            <input id={indexId} className={s.checkBox}
                   type="checkbox" name="checkbox"
                   onMouseOver={() => handleCheckboxMouseOver(indexId)}
                   onClick={() => onCheckboxClick(indexId)} />
            {props.children(item)}
        </div>
    });

    const deleteHandler = () => {
        deleteItems(itemsIdsArr);
    }



    return (
        <div>
            <div className={s.controlPane} >
                <p className={s.items_chosen} >{itemsIdsArr.length} items chosen</p>
                <button className={s.btn+" "+s.cancel_btn} onClick={uncheckAll} >CANCEL</button>
                <button className={s.btn+" "+s.delete_btn} onClick={deleteHandler} >DELETE</button>
            </div>
            {itemsList}
        </div>
    );
}

export default ItemsList;