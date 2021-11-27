import React from 'react';
import s from "../Product.module.css";
import ProductForm from "../ProductForm/ProductForm";
import chairIcon from "../../../../IMGS/chair.png";
import PhotosPane from "../PhotosPane/PhotosPane";
import ListsSelect from "../../ListSelect/ListsSelect";
import ItemsListC from "../../ItemsList/ItemsListC";
import Loading from "../../../Extra/Loading";

function UpdateProduct({
                           prodId, updateProduct,
                           addElement, addPhotos, deletePhotos,
                           pushToHistory, setChosenProductAC, updateProductProps,
                       }) {

    let {lists, productData, isLoading} = updateProductProps;
    let thumbnail = null;

    const onSubmit = (formData) => {
        console.log(formData);
        if (prodId) updateProduct(prodId, formData, thumbnail);
    }

    const onChoosingProductsBtn = () => {
        setChosenProductAC(productData);
        pushToHistory("/admin");
    }

    let onThumbnailSelected = (e) => {
        if (e.target.files.length) thumbnail = e.target.files[0];
    }

    const getArrWithoutDeleted = (initArr, idsArr) => {    //  for similar and related
        let similarArr = [...initArr];
        let similarProductsWithoutDeleted = [];
        for (let i = 0; i < similarArr.length; i++) {
            let isDeleting = false;
            for (let t = 0; t < idsArr.length; t++) {
                if (similarArr[i]._id === idsArr[t]) {
                    isDeleting = true
                }
            }
            if (!isDeleting) similarProductsWithoutDeleted.push(similarArr[i]._id);
        }
        return similarProductsWithoutDeleted;
    }

    const onSimilarDelete = (idsArr) => {
        let data = getArrWithoutDeleted(productData.similarProducts, idsArr);
        updateProduct(prodId, {similarProducts: data});
    }

    const onRelatedDelete = (idsArr) => {
        let data = getArrWithoutDeleted(productData.relatedProducts, idsArr);
        updateProduct(prodId, {relatedProducts: data});
    }

    let typesList = productData.types.map(t => {
        return <p key={t}>{t}</p>
    });

    if (isLoading && !productData._id) return <div><Loading/></div>;

    return (<div className={s.pane}>
            <h1>Update Product</h1>
            <br/><br/>
            <div style={{display: "flex"}} >
            {/*//===THUMB_PANE========*/}
            <div style={{width: "10rem"}} >
            <img className={s.thumbnail}
                 src={productData.thumbnail ? productData.thumbnail : chairIcon} alt="img"/>
            <input type="file" disabled={false} onChange={onThumbnailSelected}/>
            </div>

            {/*//===TYPES_SELECTOR=====*/}
            <div className={s.selectBox}>
                <div style={{height: "2rem"}} ><span style={{fontWeight: "bolder"}}>Available in: </span> {typesList}</div>
                <div style={{display: "flex"}} >
                <ListsSelect lists={lists} addElement={addElement} prodIdArr={[prodId]}/>
                <button style={{height: "3rem"}} onClick={onChoosingProductsBtn}>Choose related or similar products</button>
                </div>
            </div>
            </div>

            <ProductForm initialValues={productData} onSubmit={onSubmit}/>

            <PhotosPane images={productData.images} addPhotos={addPhotos}
                        prodId={prodId} deletePhotos={deletePhotos}
            />

            <div className={s.similar_products_div}>
                Similar Products
                <ItemsListC items={productData.similarProducts} deleteItems={onSimilarDelete}>
                    {(item) => <div style={{display: "flex", marginLeft: "2rem"}}>
                        <img style={{width: "2rem"}} src={item.thumbnail} alt="thumb"/>
                        <p style={{marginLeft: "2rem"}}>{item.name}</p>
                    </div>}
                </ItemsListC>
            </div>

            <div className={s.related_products_div}>
                Related Products
                <ItemsListC items={productData.relatedProducts} deleteItems={onRelatedDelete}>
                    {(item) => <div style={{display: "flex", marginLeft: "2rem"}}>
                        <img style={{width: "2rem"}} src={item.thumbnail} alt="thumb"/>
                        <p style={{marginLeft: "2rem"}}>{item.name}</p>
                    </div>}
                </ItemsListC>
            </div>

        </div>
    );
}

export default UpdateProduct;