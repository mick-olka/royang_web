import React from 'react';
import {myFormInput} from "../../../../UTILS/FormUtils";
import {useFormik} from "formik";

function PhotoForm({onSubmit}) {
    const formik = useFormik({
        initialValues: {
            mainColor: "",
            pillColor: "",
        },
        onSubmit: values => {
            onSubmit(values);
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="mainColor">Main Color</label>
                {myFormInput("mainColor", "text", formik.values.mainColor, formik.handleChange)}
                <label htmlFor="pillColor">Pill Color</label>
                {myFormInput("pillColor", "text", formik.values.pillColor, formik.handleChange)}
                <div><button type="submit" >+ PHOTO</button></div>
            </form>
        </div>
    );
}

export default PhotoForm;