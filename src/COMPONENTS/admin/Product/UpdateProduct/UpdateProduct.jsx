import React, {useState} from 'react';
import s from "../Product.module.css";
import ProductForm from "../ProductForm/ProductForm";
import chairIcon from "../../../../IMGS/chair.png";
import PhotosPane from "../PhotosPane/PhotosPane";
import SomeError from "../../../extra/SomeError";
import ListsSelect from "../../ListSelect/ListsSelect";

function UpdateProduct({prodId, updateProduct,
                           addElement,  addPhotos, deletePhotos,
                            pushToHistory, setChosenProductAC, updateProductProps,
                       }) {

    let {lists, newError, productData, isLoading} = updateProductProps;
    let thumbnail = null;
    // let pn = useLocation().pathname;
    // console.log(pn.split('/').pop());
    // let prodId=pn.split('/').pop();

    // useEffect(()=>{
    //     setIdOfCreatedAC(null);     //  for resetting create page
    //     if (prodId && prodId.length===24) {
    //         getProductById(prodId);
    //     } else {
    //         pushToHistory("/admin");
    //     }
    // }, [getProductById, prodId, pushToHistory, setIdOfCreatedAC]);

    const onSubmit = (formData) => {
        if (prodId) updateProduct(prodId, formData, thumbnail);
    }

    const onChoosingProductsBtn = () => {
        setChosenProductAC({prodId: prodId, name: productData.name});
        pushToHistory("/admin");
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
        let chosen_lists = chosenLists.map(l => {
            return l.value;
        });
        addElement(chosen_lists, prodId);
    }

    let [chosenLists, setChosenLists] = useState([]);

    if (newError) {
        return <SomeError returnTo="/admin" error={newError}/>
    }

    if (isLoading && !productData._id) return <div>Loading...</div>;

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
                        {/*<button disabled={chosenLists.length <= 0} onClick={() => handleSelectSubmit()}>Add to list:</button>*/}
                        {/*<Select isMulti options={typesToSelect} onChange={(value) => setChosenLists(value)}/>*/}
                        <ListsSelect lists={lists} addElement={addElement} prodIdArr={[prodId]} />
                        <button onClick={onChoosingProductsBtn}>Choose related or similar products</button>

                    </div>

                    <ProductForm initialValues={productData} onSubmit={onSubmit} />

                    <PhotosPane images={productData.images} addPhotos={addPhotos}
                                prodId={prodId} deletePhotos={deletePhotos}
/>

                </div>
    );
}

export default UpdateProduct;