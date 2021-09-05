
import React, {useState} from 'react';

const Search = ({findProducts, redirectTo, ...props}) => {

    let [string, setString] = useState("");

    const onSubmit = (string) => {
        findProducts(string);
        props.history.push(redirectTo);
    }

    return (
        <div>
            <input type="text" value={string} onChange={e => setString(e.target.value)} />
            <button onClick={()=>onSubmit(string)} >Search</button>
        </div>
    );
};

export default Search;