import React from 'react';
import {myFormInput} from "../../../UTILS/FormUtils";
import {useFormik} from "formik";

const validate = values => {
    const errors = {};
    const phoneRegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

    if (!values.name) {
        errors.name = 'Required';
    } else if (values.name.length < 2) {
        errors.name = 'Must be 2 characters or more';
    }

    if (!values.phone) {
        errors.phone = 'Required';
    } else if (!phoneRegExp.test(values.phone)) {
        errors.phone = 'Invalid phone number';
    }

    return errors;
};

function OrderForm({onSubmit}) {
    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            message: "",
        },
        validate,
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
                {formik.errors.name ? <div>{formik.errors.name}</div> : null}

                <div>
                <label htmlFor="phone">Phone</label>
                {myFormInput("phone", "text", formik.values.phone, formik.handleChange)}
                </div>
                {formik.errors.phone ? <div>{formik.errors.phone}</div> : null}

                <div>
                <label htmlFor="message">Comment</label>
                {myFormInput("message", "text", formik.values.message, formik.handleChange)}
                </div>
                {formik.errors.message ? <div>{formik.errors.message}</div> : null}

                <div><button type="submit" >SUBMIT</button></div>
            </form>
        </div>
    );
}

export default OrderForm;