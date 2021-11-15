import React, { useState} from 'react';
import s from "./ListPane.module.css";
import ListForm from "./ListForm/ListForm";
import {Redirect} from "react-router-dom";
import ProductItem from "../Product/ProductItem";
import ItemsListC from "../ItemsList/ItemsListC";
import PaginatorC from "../../Extra/Paginator/PaginatorC";
import Loading from "../../Extra/Loading";

function ListPane({listUrl, updateList, deleteList, listForm, deleteElement, getListByUrl, isLoading, setCurrentPageAC}) {

    //let pn = useLocation().pathname;
    //console.log(pn.split('/').pop());
    //let listUrl = pn.split('/').pop();
    //useEffect(() => getListByUrl(listUrl), [getListByUrl, listUrl]);

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

    const onPageChanged=(pageNumber)=> {     //  WHEN RETURNED FROM SEARCH PAGE
        setCurrentPageAC(pageNumber);
        getListByUrl(listUrl, pageNumber);
    }

    let [isDeleted, setIsDeleted] = useState(false);

    if (isLoading || !listForm) return <div><Loading /></div>;
    return (
        <div className={s.pane}>
            <h1>{listForm.name}</h1>
            <br/>
            {isDeleted && <Redirect to="/admin"/>}
            <h1>Update List</h1>

            <ListForm onSubmit={onSubmit} listUrl={listUrl} initData={listForm}/>

            <button onClick={onTypeDelete}>DELETE</button>
            {listForm && <ItemsListC
                                    items={listForm.items} deleteItems={onElementsDelete}>
                {item => <ProductItem item={item}/>}
            </ItemsListC>}

            <PaginatorC onPageChanged={onPageChanged} />

        </div>
    );
}

export default ListPane;