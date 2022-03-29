import React from 'react';
import {myFormInput} from "../../../../UTILS/FormUtils";
import {useFormik} from "formik";
import s from "./PhotosPane.module.css";

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
            <form className={s.photo_form} onSubmit={formik.handleSubmit}>
                <div>
                    <h2>Main Color</h2>
                <div className={s.input_block} >
                <label htmlFor="mainColor.ua">UA</label>
                {myFormInput("mainColor.ua", "text", formik.values.mainColor.ua, formik.handleChange)}
                </div>
                <div className={s.input_block} >
                <label htmlFor="mainColor.ru">RU</label>
                {myFormInput("mainColor.ru", "text", formik.values.mainColor.ru, formik.handleChange)}
                </div>
                </div>
                <div>
                    <h2>Pill Color</h2>
                <div className={s.input_block} >
                <label htmlFor="pillColor.ua">UA</label>
                {myFormInput("pillColor.ua", "text", formik.values.pillColor.ua, formik.handleChange)}
                </div>
                <div className={s.input_block} >
                <label htmlFor="pillColor.ru">RU</label>
                {myFormInput("pillColor.ru", "text", formik.values.pillColor.ru, formik.handleChange)}
                </div>
                </div>
                <div><button style={{padding: "0.2rem", width: "10rem", fontSize: "1.2rem"}} type="submit" >Add</button></div>
            </form>
        </div>
    );
}

export default PhotoForm;