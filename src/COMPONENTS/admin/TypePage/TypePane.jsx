import React, {useState} from 'react';
import s from "./TypePane.module.css";
import TypeForm from "./TypeForm/TypeForm";
import {Redirect} from "react-router-dom";
import ProductsList from "../ProductsList_N/ProductsList";

function TypePane({updateList, deleteList, listUrl, listForm, deleteElement}) {

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

    return (
        <div className={s.pane} >
            {isDeleted && <Redirect to="/admin" />}
            <h1>Update List</h1>

            <TypeForm onSubmit={onSubmit} listUrl={listUrl} initData={listForm} />

            <button onClick={onTypeDelete} >DELETE</button>
            {listForm && <ProductsList products={listForm.items} deleteProducts={onElementsDelete} />}
        </div>
    );
}

export default TypePane;