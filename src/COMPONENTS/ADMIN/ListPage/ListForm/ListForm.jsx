import React from 'react';
import {Formik, Form, Field, useFormik} from 'formik';
import s from "./ListForm.module.css";
import {myFormInput} from "../../../../UTILS/FormUtils";

const ListForm = (props) => {

    let initialValues = {
        name: props.initData ? props.initData.name : '',
        url: props.listUrl || "",
        index: props.initData ? props.initData.index : 0
    };

    // if (props.listUrl) {
    //     initialValues.name=props.initData.name;
    //     initialValues.index=props.initData.index;
    // };
    const formik = useFormik({
        initialValues: {...initialValues},
        onSubmit: values => {
            //console.log(values);
            props.onSubmit(values);
        },
    });

    return <div className={s.list_form_div} >
        {/*<Formik initialValues={initialValues} onSubmit={(values, {resetForm}) => {*/}
        {/*    props.onSubmit(values);*/}
        {/*    // resetForm({values: {name: "0"}});*/}
        {/*}}>*/}
        {/*    {({values}) => (*/}
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.input_div} >
                        <label htmlFor="name.ua">Name UA: </label>
                        {/*<Field name="name.ua" />*/}
                        {myFormInput("name.ua", "text", formik.values.name['ua'], formik.handleChange)}
                    </div>
                    <div className={s.input_div} >
                        <label htmlFor="name.ru">Name RU: </label>
                        {/*<Field name="name.ua" />*/}
                        {myFormInput("name.ru", "text", formik.values.name['ru'], formik.handleChange)}
                    </div>
                    <div className={s.input_div} >
                        <label htmlFor="url">URL: </label>
                        {myFormInput("url", "text", formik.values.url, formik.handleChange)}
                    </div>
                    <div className={s.input_div} >
                        <label htmlFor="index">Index: </label>
                        {myFormInput("index", "number", formik.values.index, formik.handleChange)}
                    </div>
                    <button style={{width: "100%", fontSize: "1.5rem"}} type="submit">SAVE</button>
                </form>
        {/*    )}*/}
        {/*</Formik>*/}
    </div>
}

export default ListForm;