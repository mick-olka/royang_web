// import React, {useState} from 'react';
// import s from "./Product.module.css";
// import ProductForm from "./ProductForm/ProductForm";
// import Select from 'react-select'
// import {MainContextConsumer} from "../../../UTILS/mainContext";
// import chairIcon from "../../../IMGS/chair.png";
// import PhotosPane from "./PhotosPane/PhotosPane";
//
// function Product({createProduct, updateProduct, prodId, productForm, lists, addElement}) {
//
//     let thumbnail=null;
//
//     const onSubmit = (formData) => {
//         if (prodId) {
//             updateProduct(prodId, formData, thumbnail);
//         } else createProduct(formData, thumbnail);
//     }
//
//     let onThumbnailSelected=(e)=> {
//         if (e.target.files.length) {
//             thumbnail=e.target.files[0];
//         }
//     }
//
//     let options = [];
//     if (lists) options = [...lists].map(l=> {
//         let l0 = {...l};
//         return {value: l0.url, label: l0.name};
//     });
//
//     let [chosenList, setChosenList] = useState(null);
//
//     return ( <MainContextConsumer>
//             {context => (
//         <div className={s.pane} >
//             <h1>{prodId ? "Update" : "Create"} Product</h1>
//             <label>Thumbnail</label>
//             <img className={s.thumbnail} src={productForm.thumbnail? context.apiURL+productForm.thumbnail:chairIcon} alt="img"/>
//             <input type="file" disabled={false} onChange={onThumbnailSelected} />
//
//             <div className={s.selectBox} >
//                 <button disabled={!chosenList} onClick={()=>addElement(chosenList, prodId)} >Add to list: </button>
//                 <Select options={options} onChange={(value)=>setChosenList(value.value)} />
//             </div>
//
//             <ProductForm onSubmit={onSubmit} prodId={prodId} initData={productForm} />
//
//             <PhotosPane photos={productForm.images} />
//         </div>)}
//         </MainContextConsumer>
//     );
// }
//
// export default Product;