import React, {useState} from 'react';
import s from "./Product.module.css";
import ProductForm from "./ProductForm/ProductForm";
import chairIcon from "../../../IMGS/chair.png";
import {Redirect} from "react-router-dom";

function CreateProduct({createProduct, idOfCreated, ...props}) {

    let thumbnail=null;

    const onSubmit = (formData) => {
        createProduct(formData, thumbnail);
        // props.history.push("/admin/products/"+idOfCreated);
        setIsCreated(true);
    }

    let onThumbnailSelected=(e)=> {
        if (e.target.files.length) {
            thumbnail=e.target.files[0];
        }
    }
    //
    // let options = [];
    // if (lists) options = [...lists].map(l=> {
    //     let l0 = {...l};
    //     return {value: l0.url, label: l0.name};
    // });
    //
    // let [chosenList, setChosenList] = useState(null);

    let [isCreated, setIsCreated] = useState(false);

    if (isCreated&&idOfCreated) {
        return <Redirect to={"/admin/products/"+idOfCreated} />
    }

    return (
        <div className={s.pane} >
            <h1>Create Product</h1>
            <label>Thumbnail</label>
            <img className={s.thumbnail} src={chairIcon} alt="img"/>
            <input type="file" disabled={false} onChange={onThumbnailSelected} />

            {/*<div className={s.selectBox} >*/}
            {/*    <button disabled={!chosenList} onClick={()=>addElement(chosenList, prodId)} >Add to list: </button>*/}
            {/*    <Select options={options} onChange={(value)=>setChosenList(value.value)} />*/}
            {/*</div>*/}

            <ProductForm onSubmit={onSubmit} />

            {/*<PhotosPane photos={productForm.images} />*/}
        </div>
    );
}

export default CreateProduct;