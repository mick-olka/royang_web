import React from 'react';
import {Formik, Form, Field, FieldArray} from 'formik';
import s from "./ProductForm.module.css";

const ProductForm = (props) => {

    let initValues = {
        name: props.initialValues.name,
        code: props.initialValues.code,
        price: props.initialValues.price,
        oldPrice: props.initialValues.oldPrice,
        index: props.initialValues.index,
        features: props.initialValues.features,
        description: props.initialValues.description,
    }

    return <div>
        <Formik initialValues={initValues} onSubmit={values => {
            props.onSubmit(values)
        }}>
            {({values}) => (
                <Form>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <Field name="name"/>
                    </div>
                    <div>
                        <label htmlFor="code">Code: </label>
                        <Field name="code"/>
                    </div>
                    <div>
                        <label htmlFor="price">Price: </label>
                        <Field type="number" name="price"/>
                    </div>
                    <div>
                        <label htmlFor="oldPrice">Old Price: </label>
                        <Field type="number" name="oldPrice"/>
                    </div>
                    <div>
                        <label htmlFor="index">Index: </label>
                        <Field type="number" name="index"/>
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
                    <div>
                        <label htmlFor="description">Description: </label>
                        <Field type="text" component="textarea" name="description"/>
                    </div>
                    <div>
                        <button className={s.submit_btn} type="submit" >SAVE</button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
};

export default ProductForm;