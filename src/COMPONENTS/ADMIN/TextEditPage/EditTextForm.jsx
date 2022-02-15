import React, {useState} from 'react';
import {useFormik} from "formik";
import {myFormInput, myFormTextarea} from "../../../UTILS/FormUtils";
import s from "./TextEditForm.module.css";

function EditTextForm({onSubmit, initValues}) {
    const [isOpen, setIsOpen] = useState(false);
    const formik = useFormik({
        initialValues: {...initValues},
        onSubmit: values => {
            onSubmit(values);
        },
    });
    return (
        <div className={s.form_container} style={isOpen? {height: "fit-content"}:null} >
            <button className={s.open_btn} onClick={()=>setIsOpen(!isOpen)} >{isOpen? 'close':'open'}</button>
            <form onSubmit={formik.handleSubmit} className={s.text_edit_item} >
                <div className={s.input_block} >
                <label htmlFor="name" onClick={()=>setIsOpen(!isOpen)} >Name</label>
                {myFormInput("name", "text", formik.values.name, formik.handleChange)}
                </div>

                <div className={s.input_block} >
                    <label htmlFor="text">Text UA</label>
                    {myFormTextarea("text.ua", formik.values.text['ua'], formik.handleChange)}
                </div>
                <div className={s.input_block} >
                    <label htmlFor="text">Text RU</label>
                    {myFormTextarea("text.ru", formik.values.text['ru'], formik.handleChange)}
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