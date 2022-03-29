import React from 'react';
import {myFormInput} from "../../../../UTILS/FormUtils";
import {useFormik} from "formik";

function PhotoForm({onSubmit}) {
    const formik = useFormik({
        initialValues: {
            mainColor: {ua: "", ru: ""},
            pillColor: {ua: "", ru: ""},
        },
        onSubmit: values => {
            onSubmit(values);
        },
    });
    return (
        <div style={{margin: "1rem"}} >
            <form onSubmit={formik.handleSubmit}>
                <div>
                <label htmlFor="mainColor.ua">Main Color UA</label>
                {myFormInput("mainColor.ua", "text", formik.values.mainColor.ua, formik.handleChange)}
                <label htmlFor="mainColor.ru">Main Color RU</label>
                {myFormInput("mainColor.ru", "text", formik.values.mainColor.ru, formik.handleChange)}
                </div>
                <div>
                <label htmlFor="pillColor.ua">Pill Color UA</label>
                {myFormInput("pillColor.ua", "text", formik.values.pillColor.ua, formik.handleChange)}
                <label htmlFor="pillColor.ru">Pill Color RU</label>
                {myFormInput("pillColor.ru", "text", formik.values.pillColor.ru, formik.handleChange)}
                </div>
                <div><button style={{padding: "0.2rem", width: "10rem", fontSize: "1.2rem"}} type="submit" >Add</button></div>
            </form>
        </div>
    );
}

export default PhotoForm;