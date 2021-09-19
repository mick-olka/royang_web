
import React from 'react';
import {useFormik} from "formik";

const Search = ({redirectTo, ...props}) => {

    //let [string, setString] = useState("");

    const onSubmit = (string) => {
        props.history.push(redirectTo+"?search="+string);
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
        <form onSubmit={formik.handleSubmit}>
            <input
                id="search_input"
                name="search_input"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.search_input}
            />
            <button type="submit">Search</button>
        </form>
    );
}
