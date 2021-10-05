import React, {useEffect} from 'react';
import s from "./Product.module.css";
import ProductForm from "./ProductForm/ProductForm";
import chairIcon from "../../../IMGS/chair.png";

function CreateProduct({createProduct, idOfCreated, pushToHistory}) {

    let thumbnail=null;

    useEffect(()=>{
        if (idOfCreated!=null) pushToHistory("/admin/products/"+idOfCreated)},
        [idOfCreated, pushToHistory]);

    const onSubmit = async (formData) => {
        await createProduct(formData, thumbnail);
        // setIsCreated(true);
    }

    let onThumbnailSelected=(e)=> {
        if (e.target.files.length) {
            thumbnail=e.target.files[0];
        }
    }

    return (
        <div className={s.pane} >
            <h1>Create Product</h1>
            <label>Thumbnail</label>
            <img className={s.thumbnail} src={chairIcon} alt="img"/>
            <input type="file" disabled={false} onChange={onThumbnailSelected} />

            <ProductForm onSubmit={onSubmit} />

        </div>
    );
}

export default CreateProduct;