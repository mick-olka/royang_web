import React, {useEffect} from 'react';
import s from "./ItemsList.module.css";

function ItemsList({items, deleteItems, itemsIdsArr, setItemsIdArr, ...props}) {
    let isMouseDown = false;
    document.body.onmousedown = () => {isMouseDown = true}
    document.body.onmouseup = () => {isMouseDown = false}

    const uncheckAll = () => {
        setItemsIdArr([]);
    }

    useEffect(()=> {
        for (let i = 0; i < items.length; i++) {
            if (itemsIdsArr.indexOf(items[i]._id) !== -1) {
                document.getElementById(items[i]._id).checked = true;
            } else document.getElementById(items[i]._id).checked = false;
        }
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