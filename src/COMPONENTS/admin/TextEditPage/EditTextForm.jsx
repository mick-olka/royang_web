import React from 'react';
import {useFormik} from "formik";
import {myFormInput} from "../../../UTILS/FormUtils";

function EditTextForm({onSubmit, initValues}) {
    const formik = useFormik({
        initialValues: {...initValues},
        onSubmit: values => {
            onSubmit(values);
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name</label>
                {myFormInput("name", "text", formik.values.name, formik.handleChange)}

                <label htmlFor="text">Text</label>
                {myFormInput("text", "text", formik.values.text, formik.handleChange)}

                <label htmlFor="nav_link">Link</label>
                {myFormInput("nav_link", "text", formik.values.nav_link, formik.handleChange)}

                <div><button type="submit" >UPDATE</button></div>
            </form>
        </div>
    );
}

export default EditTextForm;