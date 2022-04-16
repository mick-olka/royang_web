import React, {useEffect, useState} from 'react';
import {Formik, Form, Field, FieldArray} from 'formik';
import s from "./ProductForm.module.css";
import Loading from "../../../Extra/Loading";
const onCtrS = (e) => {
    if (e.ctrlKey && e.code === 'KeyS') {
        e.preventDefault();
        document.getElementById('submit_btn').click();
    }
}
const ProductForm = (props) => {
    const [locale0, setLocale0] = useState("ua");   //  dummy to rerender form on locale change
    useEffect(()=>{setLocale0(props.locale)}, [props.locale]);
    useEffect(()=>{
        document.addEventListener('keydown', onCtrS);
        return () => document.removeEventListener('keydown', onCtrS);
    }, [])
    let initValues = {
        name: props.initialValues.name[props.locale] || "",
        url_name: props.initialValues.url_name,
        code: props.initialValues.code || "",
        price: props.initialValues.price,
        oldPrice: props.initialValues.oldPrice || 0,
        index: props.initialValues.index,
        features: props.initialValues.features[props.locale],
        description: props.initialValues.description[props.locale] || "",
        keywords: props.initialValues.keywords.join(', ') || "",
    }

    if (locale0 !== props.locale) {return <Loading/>}
    return <div>
        <Formik initialValues={initValues} onSubmit={values => {
            let newValues = {...props.initialValues, ...values};
            if (values.name) newValues.name = {...props.initialValues.name, [props.locale]: values.name};
            if (values.keywords || values.keywords === "") {
                newValues.keywords = values.keywords === "" ? [] : values.keywords.split(', ');
            }
            if (values.description || values.description === "") newValues.description = {...props.initialValues.description, [props.locale]: values.description};
            if (values.features) newValues.features = {...props.initialValues.features, [props.locale]: values.features};
            props.onSubmit(newValues);
        }}>
            {({values}) => (
                <Form>
                    <div className={s.container}>
                        <div className={s.inputs_container} >
                            <div className={s.inputs_div}>
                                <div>
                                    <label className={s.i_label} htmlFor="name">Name: </label>
                                    <Field name="name"/>
                                </div>
                                <div>
                                    <label className={s.i_label} htmlFor="url_name">URL Name: </label>
                                    <Field name="url_name"/>
                                </div>
                                <div>
                                    <label className={s.i_label}  htmlFor="code">Code: </label>
                                    <Field name="code"/>
                                </div>
                                <div>
                                    <label className={s.i_label}  htmlFor="price">Price: </label>
                                    <Field type="number" name="price"/>
                                </div>
                                <div>
                                    <label className={s.i_label}  htmlFor="oldPrice">Old Price: </label>
                                    <Field type="number" name="oldPrice"/>
                                </div>
                                <div>
                                    <label className={s.i_label}  htmlFor="index">Index: </label>
                                    <Field type="number" name="index"/>
                                </div>
                                <div>
                                    <label className={s.i_label}  htmlFor="keywords">Keywords: </label>
                                    <Field name="keywords"/>
                                </div>
                            </div>
                            <div className={s.t_area}>
                                <label style={{display: "block", fontWeight: "bolder"}} htmlFor="description">Description: </label>
                                <Field placeholder="description" type="text" component="textarea" name="description" />
                            </div>
                        </div>
                        <FieldArray
                            name="features"
                            render={arrayHelpers => (
                                <div>
                                    {values.features && values.features.length > 0 ? (
                                        values.features.map(({feature}, index) => (
                                            <div key={index}>
                                                <Field name={`features.${index}.key`}/>
                                                <Field name={`features.${index}.value`}/>
                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                >-
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.insert(index, {
                                                        key: "",
                                                        value: ""
                                                    })} // insert an empty string at a position
                                                >+
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <button type="button" onClick={() => arrayHelpers.push({key: "", value: ""})}>
                                            {/* show this when user has removed all features from the list */}
                                            + feature
                                        </button>
                                    )}

                                </div>
                            )}
                        />

                    </div>
                    <div>
                        <button id="submit_btn" className={s.submit_btn} type="submit">SAVE</button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
};

export default ProductForm;