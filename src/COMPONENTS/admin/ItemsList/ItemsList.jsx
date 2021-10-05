import React, {useEffect} from 'react';
import s from "../Product/ProductForm/ProductsList.module.css";

function ItemsList({items, deleteItems, itemsIdArr, setItemsIdArr, ...props}) {
    let isMouseDown = false;
    document.body.onmousedown = () => {isMouseDown = true}
    document.body.onmouseup = () => {isMouseDown = false}

    // //let arr = [];
    // let isChecked = (id) => {return document.getElementById(id).checked};
    //
    // const toggleChecked = (id) => {
    //     if (isChecked(id)) setItemsIdArr([...itemsIdArr, id]);
    //     else {
    //         let index = itemsIdArr.indexOf(id);
    //         if (index !== -1) arr.splice(index, 1);
    //     }
    //     console.log(arr);
    // }
    //
    console.log("REFR: "+itemsIdArr);

    //
    const uncheckAll = () => {
        setItemsIdArr([]);
    }
    //
    useEffect(()=> {
        for (let i = 0; i < items.length; i++) {
            if (itemsIdArr.indexOf(items[i]._id) !== -1) document.getElementById(items[i]._id).checked = true;
        }
    }, [items, itemsIdArr]);

    const onCheckboxClick = (id) => {
        let index = itemsIdArr.indexOf(id);
        if (index !== -1) {    //  if available
            let arrCopy = [...itemsIdArr];
            arrCopy.splice(index, 1);
            setItemsIdArr([...arrCopy]);
            document.getElementById(id).checked = false;
        } else {
            setItemsIdArr([...itemsIdArr, id]);
            document.getElementById(id).checked = true;
        }
    }

    const handleCheckboxMouseOver = (id) => {
        if (isMouseDown) {
            // document.getElementById(id).checked = !isChecked(id);
            // toggleChecked(id);
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
        deleteItems(itemsIdArr);
    }



    return (
        <div>
            <div className={s.controlPane} >
                <p>{itemsIdArr.length} items chosen</p>
                <button className={s.btn} onClick={uncheckAll} >CANCEL</button>
                <button className={s.btn} onClick={deleteHandler} >DELETE</button>
            </div>
            {itemsList}
        </div>
    );
}

export default ItemsList;