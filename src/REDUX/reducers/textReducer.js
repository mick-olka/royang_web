import {textAPI} from "../../API/api";

const SET_ALL_TEXT = "textReducer/SET_ALL_TEXT";
const SET_TEXT_FORM = "textReducer/SET_TEXT_FORM";

let initialState = {
    text_blocks: [
        {_id: 11, name: "Loading", text: "Loading...", nav_link:""},
    ],
    textForm: null,
}

const textReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_ALL_TEXT:
            return {
                ...state, text_blocks: [...action.all_text]
            }

        case SET_TEXT_FORM:
            return {
                ...state, textForm: action.textData,
            }

        default:
            return state;
    }
}

const setAllTextAC = (all_text) => ({type: SET_ALL_TEXT, all_text});
export const setTextFormAC = (textData) => ({type: SET_TEXT_FORM, textData});

//====================================

export const getAllText = () => async (dispatch) => {
    try {
        let response = await textAPI.getAllText();
        dispatch(setAllTextAC(response.text_blocks));
    } catch (e) {
        console.log(e);
    }
}

export const createText = (name, text, nav_link) =>
    async (dispatch) => {
        try {
            let res = await textAPI.createText(name, text, nav_link);
            if (res.code === 0) {
                dispatch(getAllText());
            }
        } catch (e) {
            alert("createText: "+e);
        }
    }

export const updateText = (name, text, nav_link) =>
    async (dispatch) => {
        try {
            let res = await textAPI.updateText(name, text, nav_link);
            if (res.code === 0) {
                dispatch(getAllText());
            }
        } catch (e) {
            alert("createText: "+e);
        }
    }

    export const deleteText = (name) => async (dispatch) => {
        try {
            let res = await textAPI.deleteText(name);
            if (res.code === 0) {
                dispatch(getAllText());
            }
        } catch (e) {
            alert("deleteText: "+e);
        }
    }

export default textReducer;