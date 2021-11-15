// import React from 'react';
// import {useFormik} from "formik";
// import s from "../Product.module.css";
// import {myFormInput} from "../../../../UTILS/FormUtils";
//
// function CreateProductForm1({onSubmit, error}) {
//
//     const formik = useFormik({
//
//         initialValues: {
//             name: '',
//             code: '',
//             price: 0,
//             figures: {},
//             otherFeatures: {},
//         },
//         onSubmit: values => {onSubmit(values)},
//     });
//
//     return (
//
//         <form className={s.form} onSubmit={formik.handleSubmit}>
//
//             <div className={s.inputPane} >
//                 <label htmlFor="name">Name</label>
//                 {myFormInput("name", "name", "text", formik.values.name, formik.handleChange)}
//             </div>
//
//             <div className={s.inputPane} >
//             <label htmlFor="code">Code</label>
//             {/*<input*/}
//             {/*    id="code"*/}
//             {/*    name="code"*/}
//             {/*    type="text"*/}
//             {/*    onChange={formik.handleChange}*/}
//             {/*    value={formik.values.code}*/}
//             {/*/>*/}
//                 {myFormInput("code", "code", "code", formik.values.code, formik.handleChange)}
//             </div>
//
//             <div className={s.inputPane} >
//             <label htmlFor="price">Price</label>
//             {/*<input*/}
//             {/*    id="price"*/}
//             {/*    name="price"*/}
//             {/*    type="number"*/}
//             {/*    onChange={formik.handleChange}*/}
//             {/*    value={formik.values.price}*/}
//             {/*/>*/}
//                 {myFormInput("price", "price", "price", formik.values.price, formik.handleChange)}
//             </div>
//
//             <div>
//             <div>
//                 {/*<input id="nk" name="nk" type="text"*/}
//                 {/*       value={formik.values.newFeature.key}*/}
//                 {/*       onChange={formik.handleChange} placeholder={"key"} />*/}
//                 {/*<input id="nv" name="nv" type="text"*/}
//                 {/*       value={formik.values.newFeature.key}*/}
//                 {/*       onChange={formik.handleChange} placeholder={"value"} />*/}
//             </div>
//             </div>
//             {/*{Object.keys(formik.values.otherFeatures).map(key => {*/}
//             {/*    return <div><input type="text" value={key} /> <input type="text" value={formik.values.otherFeatures[key]} /></div>*/}
//             {/*})}*/}
//
//             <button type="submit">Submit</button>
//
//         </form>
//
//     );
// }
//
// export default CreateProductForm1;
