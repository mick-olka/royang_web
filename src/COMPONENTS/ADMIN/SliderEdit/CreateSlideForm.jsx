import React from 'react';
import {useFormik} from "formik";
import {myFormInput} from "../../../UTILS/FormUtils";

function CreateSlideForm({onSubmit}) {
    const formik = useFormik({
        initialValues: {
            text: "",
            lower_text: "",
            nav_link: "",
        },
        onSubmit: values => {
            onSubmit(values);
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="text">Text</label>
                {myFormInput("text", "text", formik.values.text, formik.handleChange)}

                <label htmlFor="lower_text">Lower Text</label>
                {myFormInput("lower_text", "text", formik.values.lower_text, formik.handleChange)}

                <label htmlFor="nav_link">Link</label>
                {myFormInput("nav_link", "text", formik.values.nav_link, formik.handleChange)}

                <div><button type="submit" >CREATE</button></div>
            </form>
        </div>
    );
}

export default CreateSlideForm;