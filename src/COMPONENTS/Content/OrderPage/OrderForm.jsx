import React from 'react';
import {myFormInput} from "../../../UTILS/FormUtils";
import {useFormik} from "formik";

function OrderForm({onSubmit}) {
    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            message: "",
        },
        onSubmit: values => {
            onSubmit(values);
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                <label htmlFor="name">Name</label>
                {myFormInput("name", "text", formik.values.name, formik.handleChange)}
                </div>

                <div>
                <label htmlFor="phone">Phone</label>
                {myFormInput("phone", "text", formik.values.phone, formik.handleChange)}
                </div>

                <div>
                <label htmlFor="message">Comment</label>
                {myFormInput("message", "text", formik.values.message, formik.handleChange)}
                </div>

                <div><button type="submit" >SUBMIT</button></div>
            </form>
        </div>
    );
}

export default OrderForm;