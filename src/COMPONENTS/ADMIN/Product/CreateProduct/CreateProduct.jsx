import React, {useEffect} from 'react';
import s from "../Product.module.css";
import ProductForm from "../ProductForm/ProductForm";
import chairIcon from "../../../../IMGS/chair.png";

function CreateProduct({createProduct, idOfCreated, pushToHistory}) {

    let initialValues = {
        features: {ua:[
            {key: "Ширина, см.", value: "0"},
            {key: "Глибина, см", value: "0"},
            {key: "Висота, см", value: "0"},
            {key: "Країна", value: "Україна"},
            {key: "Матеріал", value: "Алюміній, поліетиленова стрічка, скло "},
        ]},
        name: {ua: ''},
        url_name: '',
        code: '',
        price: 0,
        oldPrice: 0,
        index: 0,
        description: {ua: ""},
        keywords: [],
    };

    let thumbnail=null;

    useEffect(()=>{
        if (idOfCreated!=null) pushToHistory("/admin/products/"+idOfCreated)},
        [idOfCreated, pushToHistory]);

    const onSubmit = async (formData) => {
        let newFormData = {...formData};
        newFormData.name.ru = newFormData.name.ua + ' ru';
        newFormData.description.ru = newFormData.description.ua + ' ru';
        newFormData.features.ru = newFormData.features.ua;
        await createProduct(formData, thumbnail);
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

            <ProductForm initialValues={initialValues} onSubmit={onSubmit} locale="ua" />

        </div>
    );
}

export default CreateProduct;