import React from 'react';
import {useFormik} from 'formik';
import s from "./ListForm.module.css";
import {myFormInput, myFormTextarea} from "../../../../UTILS/FormUtils";

const ListForm = (props) => {
    let initialValues = {
        name: {
            ua: props.initData ? props.initData.name['ua'] : '',
            ru: props.initData ? props.initData.name['ru'] : '',
        },
        url: props.listUrl || "",
        index: props.initData ? props.initData.index : 0,
        description: props.initData ? (props.initData.description || '') : '',
        keywords: props.initData ? (props.initData.keywords.join(', ') || '') : '',
    };

    const formik = useFormik({
        initialValues: {...initialValues},
        onSubmit: values => {
            props.onSubmit(values);
        },
    });

    return <div className={s.list_form_div} >
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.input_div} >
                        <label htmlFor="name.ua">Name UA: </label>
                        {myFormInput("name.ua", "text", formik.values.name['ua'], formik.handleChange)}
                    </div>
                    <div className={s.input_div} >
                        <label htmlFor="name.ru">Name RU: </label>
                        {myFormInput("name.ru", "text", formik.values.name['ru'], formik.handleChange)}
                    </div>
                    <div className={s.input_div} >
                        <label htmlFor="url">URL: </label>
                        {myFormInput("url", "text", formik.values.url, formik.handleChange)}
                    </div>
                    <div className={s.input_div} >
                        <label htmlFor="keywords">Keywords: </label>
                        {myFormInput("keywords", "text", formik.values.keywords, formik.handleChange)}
                    </div>
                    <div className={s.input_div} >
                        <label htmlFor="index">Index: </label>
                        {myFormInput("index", "number", formik.values.index, formik.handleChange)}
                    </div>
                    <div className={s.input_div} >
                        <label htmlFor="description">Description: </label>
                        {myFormTextarea("description", formik.values.description, formik.handleChange)}
                    </div>
                    <button style={{width: "100%", fontSize: "1.5rem"}} type="submit">SAVE</button>
                </form>
    </div>
}

export default ListForm;