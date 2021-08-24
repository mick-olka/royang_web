import React from "react";

// export const myFormInput = (name, type, value, handleChange) => {
//     return <input
//         id={name}
//         name={name}
//         type={type}
//         onChange={handleChange}
//         value={value}
//     />
// }

export const myFormInput = (name, type, value, onChange) => {
    return <input
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
    />
}