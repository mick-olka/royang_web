import React, {useState} from 'react';
import s from "./Product.module.css";
import ProductForm from "./ProductForm/ProductForm";
import Select from 'react-select'
import chairIcon from "../../../IMGS/chair.png";
import PhotosPane from "./PhotosPane/PhotosPane";
import SomeError from "../../extra/SomeError";

function UpdateProduct({updateProduct, prodId, productData, lists, addElement, newError, addPhotos, deletePhotos, isLoading}) {

    let thumbnail = null;

    const onSubmit = (formData) => {
        if (prodId) updateProduct(prodId, formData, thumbnail);
    }

    let onThumbnailSelected = (e) => {
        if (e.target.files.length) thumbnail = e.target.files[0];
    }

    let typesList = productData.types.map(t => {return <p key={t} >{t}</p>});

    let typesToSelect = [];
    let l0;
    if (lists) {
        for (let i=0; i<lists.length; i++) {
            let productHasType = productData.types.find(t => t === lists[i].name);
            if (!productHasType) {
                l0 = {...lists[i]};
                typesToSelect.push({value: l0.url, label: l0.name});
            }
        }
    }

    const handleSelectSubmit = () => {
        let chosen_types = chosenLists.map(l => {
            return l.value;
        });
        addElement(chosen_types, prodId);
    }

    let [chosenLists, setChosenLists] = useState([]);

    if (newError) {
        return <SomeError returnTo="/admin" error={newError}/>
    }

    return ( <div className={s.pane}>
                    <h1>Update Product</h1>
                    {/*//===THUMB_PANE========*/}
                    <label>Thumbnail</label>
                    <img className={s.thumbnail}
                         src={productData.thumbnail ? productData.thumbnail : chairIcon} alt="img"/>
                    <input type="file" disabled={false} onChange={onThumbnailSelected} />

                    {/*//===TYPES_SELECTOR=====*/}
                    <div className={s.selectBox}>
                        <div>{typesList}</div>
                        <button disabled={chosenLists.length <= 0} onClick={() => handleSelectSubmit()}>Add to list:
                        </button>
                        <Select isMulti options={typesToSelect} onChange={(value) => setChosenLists(value)}/>
                    </div>

                    <ProductForm onSubmit={onSubmit} prodId={prodId} initData={productData}/>

                    <PhotosPane images={productData.images} addPhotos={addPhotos} prodId={prodId} deletePhotos={deletePhotos} />

                </div>
    );
}

export default UpdateProduct;