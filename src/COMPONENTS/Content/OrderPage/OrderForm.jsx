import React from 'react';
import {myFormInput} from "../../../UTILS/FormUtils";
import {useFormik} from "formik";
import s from "./OrderPage.module.css";

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
                <div className={s.form_input_item} >
                <label htmlFor="name">Ім'я</label>
                {myFormInput("name", "text", formik.values.name, formik.handleChange)}
                </div>
                {formik.errors.name ? <div>{formik.errors.name}</div> : null}

                <div className={s.form_input_item} >
                <label htmlFor="phone">Телефон</label>
                {myFormInput("phone", "text", formik.values.phone, formik.handleChange)}
                </div>
                {formik.errors.phone ? <div>{formik.errors.phone}</div> : null}

                <div className={s.form_input_item} id={s.comment} >
                <label htmlFor="message">Коментарій</label>
                    <p> (запитання) </p>
                    <p> (місце доставки) </p>
                    <textarea
                        id={"message"}
                        name={"message"}
                        rows={5}
                        onChange={formik.handleChange}
                        value={formik.values.message}
                    />
                {/*{myFormInput("message", "textarea", formik.values.message, formik.handleChange)}*/}
                </div>
                {formik.errors.message ? <div>{formik.errors.message}</div> : null}

                <div><button className={s.submit_btn} type="submit" >Відправити</button></div>
            </form>
        </div>
    );
}

export default OrderForm;