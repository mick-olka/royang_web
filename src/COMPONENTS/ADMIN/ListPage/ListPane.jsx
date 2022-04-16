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
        setShowSettings(false);
        if (listUrl) {
            updateList(listUrl, formData);
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

    const [isDeleted, setIsDeleted] = useState(false);    //  for redirecting after delete
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    if (isLoading || !listForm) return <div><Loading/></div>;
    return (
        <div className={s.pane}>
            <div className={s.header_pane} >
            <h1 style={{textAlign: "center", fontSize: "1.8rem", display: "inline-block"}} >{listForm.name['ua']} |
            <span className={s.settings_btn} onClick={()=>setShowSettings(!showSettings)} role="img" aria-label="settings" >⚙️</span></h1>
            </div>
            <br/><br/>
            {isDeleted && <Redirect to="/admin"/>}

            <div style={showSettings ? {display: 'block'}:{display: 'none'}} >
                <button style={{backgroundColor: "#dd6666", display: "inline-block"}} onClick={()=>setShowConfirm(true)}>Delete Collection</button>
                <div style={showConfirm ? {display: 'block'}:{display: 'none'}} >Confirm deleting?<button onClick={()=>setShowConfirm(false)} >No</button>
                    <button onClick={onTypeDelete}>Yes</button></div>
                <ListForm onSubmit={onSubmit} listUrl={listUrl} initData={listForm}/>
            </div>

            {listForm && <ItemsListC
                items={listForm.items} deleteItems={onElementsDelete}>
                {item => <ProductItem item={item} currency_value={currency_value} />}
            </ItemsListC>}

            <PaginatorC onPageChanged={onPageChanged}/>

        </div>
    );
}

export default ListPane;