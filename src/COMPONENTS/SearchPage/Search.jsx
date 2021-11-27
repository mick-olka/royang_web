
import React from 'react';
import {useFormik} from "formik";
import s from "./Search.module.css";
import search_icon from "../../IMGS/ICONS/search.png";

const Search = ({redirectTo, pushToHistory}) => {

    const onSubmit = (string) => {
        if (string.length>0) pushToHistory(redirectTo+"?search="+string);
    }

    return (
        <div>
            <SearchForm onSubmit={onSubmit} />
        </div>
    );
};

export default Search;


let SearchForm = ({onSubmit, error}) => {

    const formik = useFormik({
        initialValues: {
            search_input: '',
        },
        onSubmit: values => {onSubmit(values.search_input)},
    });

    return (
        <form className={s.search_form} onSubmit={formik.handleSubmit}>
            <input
                id="search_input"
                name="search_input"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.search_input}
                className={s.search_input}
            />
            <button type="submit" className={s.search_btn} ><img className={s.search_icon} src={search_icon} alt="search"/></button>
        </form>
    );
}
