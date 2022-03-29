import React, {useEffect, useState} from 'react';
import s from "./ItemsList.module.css";

function ItemsList({items, deleteItems, itemsIdsArr, setItemsIdArr, ...props}) {
    let isMouseDown = false;
    document.body.onmousedown = () => {isMouseDown = true}
    document.body.onmouseup = () => {isMouseDown = false}

    //const showSmallPopup = useSmallPopup();
    const [showConfirm, setShowConfirm] = useState(false);

    const uncheckAll = () => {
        setItemsIdArr([]);
    }

    useEffect(()=>{
        setItemsIdArr([]);
    }, [setItemsIdArr]);

    useEffect(()=> {
        for (let i = 0; i < items.length; i++) {
            if (document.getElementById(items[i]._id)) document.getElementById(items[i]._id).checked = itemsIdsArr.indexOf(items[i]._id) !== -1;
        }
        //showSmallPopup(itemsIdsArr.length + " items");
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

    let itemsList = items.map((item, i) => {
        let indexId=item._id;
        return <div key={i} className={s.item} >
            <input id={indexId} className={s.checkBox}
                   type="checkbox" name="checkbox"
                   onMouseOver={() => handleCheckboxMouseOver(indexId)}
                   onClick={() => onCheckboxClick(indexId)} />
            {props.children(item)}
        </div>
    });

    const deleteHandler = () => {
        deleteItems(itemsIdsArr);
        setItemsIdArr([]);
    }

    return (
        <div>
            <div className={s.controlPane} >
                <p className={s.items_chosen} >{itemsIdsArr.length} items chosen</p>
                <button className={s.btn+" "+s.cancel_btn} onClick={uncheckAll} >CANCEL</button>
                <button className={s.btn+" "+s.delete_btn} onClick={()=>setShowConfirm(true)} >DELETE</button>
                <div className={s.are_you_sure_div} style={showConfirm ? {display: 'flex'} : {}} >
                    Are You Sure?<div>
                        <button onClick={()=>setShowConfirm(false)} >No</button> --
                        <button className={s.delete_btn} onClick={deleteHandler} >Yes</button>
                </div>
                </div>
            </div>
            <div className={s.list_pane} >
                {itemsList}
            </div>
        </div>
    );
}

export default ItemsList;