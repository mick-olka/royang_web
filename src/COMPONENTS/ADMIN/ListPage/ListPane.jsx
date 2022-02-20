import React, {useState} from 'react';
import s from "./ListPane.module.css";
import ListForm from "./ListForm/ListForm";
import {Redirect} from "react-router-dom";
import ProductItem from "../Product/ProductItem";
import ItemsListC from "../ItemsList/ItemsListC";
import PaginatorC from "../../Extra/Paginator/PaginatorC";
import Loading from "../../Extra/Loading";

function ListPane({
                      listUrl,
                      updateList,
                      deleteList,
                      listForm,
                      deleteElement,
                      getListByUrl,
                      isLoading,
                      setCurrentPageAC,
                      currency_value
                  }) {

    const onSubmit = (formData) => {
        if (listUrl) {
            updateList(listUrl, formData.name, formData.url, formData.index);
        }
    }

    const onTypeDelete = () => {
        deleteList(listUrl);
        setIsDeleted(true);
    }

    const onElementsDelete = (idArr) => {
        deleteElement(listUrl, idArr);
    }

    const onPageChanged = (pageNumber) => {     //  WHEN RETURNED FROM SEARCH PAGE
        setCurrentPageAC(pageNumber);
        getListByUrl(listUrl, pageNumber);
    }

    let [isDeleted, setIsDeleted] = useState(false);    //  for redirecting after delete

    if (isLoading || !listForm) return <div><Loading/></div>;
    return (
        <div className={s.pane}>
            <h1 style={{textAlign: "center", fontSize: "1.8rem", display: "inline-block"}} >{listForm.name['ua']}</h1>
            <button style={{backgroundColor: "red", display: "inline-block"}} onClick={onTypeDelete}>DELETE</button>
            <br/><br/>
            {isDeleted && <Redirect to="/admin"/>}

            <ListForm onSubmit={onSubmit} listUrl={listUrl} initData={listForm}/>

            {listForm && <ItemsListC
                items={listForm.items} deleteItems={onElementsDelete}>
                {item => <ProductItem item={item} currency_value={currency_value} />}
            </ItemsListC>}

            <PaginatorC onPageChanged={onPageChanged}/>

        </div>
    );
}

export default ListPane;