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
        <div style={{margin: "1rem"}} >
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="mainColor">Main Color</label>
                {myFormInput("mainColor", "text", formik.values.mainColor, formik.handleChange)}
                <label htmlFor="pillColor">Pill Color</label>
                {myFormInput("pillColor", "text", formik.values.pillColor, formik.handleChange)}
                <div><button style={{padding: "0.2rem", width: "10rem", fontSize: "1.2rem"}} type="submit" >+ PHOTO</button></div>
            </form>
        </div>
    );
}

export default PhotoForm;