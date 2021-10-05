import React, {useEffect, useState} from 'react';
import s from "./ListPane.module.css";
import ListForm from "./ListForm/ListForm";
import {Redirect, useLocation} from "react-router-dom";
import ItemsList0 from "../ItemsList/ItemsList0";
import ProductItem from "../Product/ProductItem";

function ListPane({updateList, deleteList, listForm, deleteElement, getListByUrl, isLoading}) {

    let pn = useLocation().pathname;
    //console.log(pn.split('/').pop());
    let listUrl = pn.split('/').pop();

    useEffect(() => getListByUrl(listUrl), [getListByUrl, listUrl]);

    const onSubmit = (formData) => {
        if (listUrl) {
            updateList(listUrl, formData.name, formData.url);
        }
    }

    const onTypeDelete = () => {
        deleteList(listUrl);
        setIsDeleted(true);
    }

    const onElementsDelete = (idArr) => {
        deleteElement(listUrl, idArr);
    }

    let [isDeleted, setIsDeleted] = useState(false);

    if (isLoading || !listForm) return <div>Loading...</div>;
    return (
        <div className={s.pane}>
            {isDeleted && <Redirect to="/admin"/>}
            <h1>Update List</h1>

            <ListForm onSubmit={onSubmit} listUrl={listUrl} initData={listForm}/>

            <button onClick={onTypeDelete}>DELETE</button>
            {listForm && <ItemsList0 items={listForm.items} deleteItems={onElementsDelete}>
                {item => <ProductItem item={item}/>}
            </ItemsList0>}

        </div>
    );
}

export default ListPane;