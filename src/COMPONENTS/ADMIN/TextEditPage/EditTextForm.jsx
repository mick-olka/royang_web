import React from 'react';
import {useFormik} from "formik";
import {myFormInput} from "../../../UTILS/FormUtils";
import s from "./TextEditForm.module.css";

function EditTextForm({onSubmit, initValues}) {
    const formik = useFormik({
        initialValues: {...initValues},
        onSubmit: values => {
            onSubmit(values);
        },
    });
    return (
        <div style={{width: "100%"}} >
            <form onSubmit={formik.handleSubmit} className={s.text_edit_item} >
                <div className={s.input_block} >
                <label htmlFor="name">Name</label>
                {myFormInput("name", "text", formik.values.name, formik.handleChange)}
                </div>

                <div className={s.input_block} >
                    <label htmlFor="text">Text</label>
                    {myFormInput("text", "text", formik.values.text, formik.handleChange)}
                </div>

                <div className={s.input_block} >
                    <label htmlFor="nav_link">Link</label>
                    {myFormInput("nav_link", "text", formik.values.nav_link, formik.handleChange)}
                </div>

                <div><button type="submit" >SAVE</button></div>
            </form>
        </div>
    );
}

export default EditTextForm;