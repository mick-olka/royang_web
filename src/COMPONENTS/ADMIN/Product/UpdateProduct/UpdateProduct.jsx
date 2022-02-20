import React, {useState} from 'react';
import s from "../Product.module.css";
import ProductForm from "../ProductForm/ProductForm";
import chairIcon from "../../../../IMGS/chair.png";
import PhotosPane from "../PhotosPane/PhotosPane";
import ListsSelect from "../../ListSelect/ListsSelect";
import ItemsListC from "../../ItemsList/ItemsListC";
import Loading from "../../../Extra/Loading";
import global_data from "../../../../REDUX/global_data";

function UpdateProduct({
                           prodId, updateProduct,
                           addElement, deleteElement, addPhotos, deletePhotos,
                           pushToHistory, setChosenProductAC, updateProductProps,
                       }) {

    let {lists, productData, isLoading} = updateProductProps;
    let thumbnail = null;
    const [locale, setLocale] = useState("ua");
    const onSubmit = (formData) => {
        if (prodId) updateProduct(prodId, formData, thumbnail);
        else console.log("No prod Id");
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
        return <p key={t.url}>{t.name['ua']}</p>
    });

    if (isLoading && !productData._id) return <div><Loading/></div>;

    return (<div className={s.pane}>
            <h1>Update Product - <span><a target="__blank" href={`${global_data.site_url}products/${productData.url_name}`}>Open on site</a></span> </h1>
            <br/>
            <div className={s.locales_div} >
                <button
                    className={ locale==="ua" ? s.active_locale_btn : s.locale_btn}
                    onClick={()=>setLocale("ua")}
                >UA</button>
                <button
                    className={ locale==="ru" ? s.active_locale_btn : s.locale_btn}
                    onClick={()=>setLocale("ru")}
                >RU</button>
            </div>
            <br/>
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
                <ListsSelect types={productData.types} lists={lists} addElement={addElement} deleteElement={deleteElement} prodIdArr={[prodId]} />
                <button style={{height: "3rem"}} onClick={onChoosingProductsBtn}>Choose related or similar products</button>
                </div>
            </div>
            </div>

            <ProductForm initialValues={productData} onSubmit={onSubmit} locale={locale} />

            <PhotosPane images={productData.images} addPhotos={addPhotos}
                        prodId={prodId} deletePhotos={deletePhotos}
            />

            <div className={s.similar_products_div}>
                Similar Products
                <ItemsListC items={productData.similarProducts} deleteItems={onSimilarDelete}>
                    {(item) => <div style={{display: "flex", marginLeft: "2rem"}}>
                        <img style={{width: "2rem"}} src={item.thumbnail} alt="thumb"/>
                        <p style={{marginLeft: "2rem"}}>{item.name && item.name.ua}</p>
                    </div>}
                </ItemsListC>
            </div>

            <div className={s.related_products_div}>
                Related Products
                <ItemsListC items={productData.relatedProducts} deleteItems={onRelatedDelete}>
                    {(item) => <div style={{display: "flex", marginLeft: "2rem"}}>
                        <img style={{width: "2rem"}} src={item.thumbnail} alt="thumb"/>
                        <p style={{marginLeft: "2rem"}}>{item.name && item.name.ua}</p>
                    </div>}
                </ItemsListC>
            </div>

        </div>
    );
}

export default UpdateProduct;