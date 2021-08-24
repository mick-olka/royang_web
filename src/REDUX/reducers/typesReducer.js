import {listsAPI} from "../../API/api";
import {getProductById} from "./productsReducer";

const SET_LISTS = "typesReducer/SET_LISTS";
const SET_LIST_FORM = "typesReducer/SET_LIST_FORM";
const SET_IS_LOADING = "typesReducer/SET_IS_LOADING";

let initialState = {
    lists: [],
    listForm: null,
    isLoading: true,
}

const typesReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_LISTS:
            return {
                ...state, lists: [...action.lists]
            }

        case SET_LIST_FORM:
            return {
                ...state, listForm: action.list,
            }

        case SET_IS_LOADING:
            return {
                ...state, isLoading: action.isLoading,
            }


        default:
            return state;
    }
}

const setListsAC = (lists) => ({type: SET_LISTS, lists});
export const setListFormAC = (list) => ({type: SET_LIST_FORM, list});
const setIsLoadingAC = (isLoading) => ({type: SET_IS_LOADING, isLoading});

//====================================

export const getLists = () => async (dispatch) => {
    dispatch(setIsLoadingAC(true));
    let response = await listsAPI.getLists();
    dispatch(setListsAC(response.lists));
    dispatch(setIsLoadingAC(false));
}

export const getListByUrl = (url) => async (dispatch) => {
    dispatch(setIsLoadingAC(true));
    let response = await listsAPI.getListByUrl(url);
    dispatch(setListFormAC(response));
    dispatch(setIsLoadingAC(false));
}

export const createList = (name, url) =>
    async (dispatch) => {
        try {
            let res = await listsAPI.createList(name, url);
            if (res.code === 0) {
                dispatch(getLists());
            }
        } catch (e) {
            alert("createList: "+e);
        }
    }

export const updateList = (url, name, newUrl) =>
    async (dispatch) => {
        try {
            let res = await listsAPI.updateList(url, name, newUrl);
            if (res.code === 0) {
                dispatch(getLists());
            }
        } catch (e) {
            alert("updateList: "+e);
        }
    }

    export const deleteList = (url) => async (dispatch) => {
        try {
            let res = await listsAPI.deleteList(url);
            if (res.code === 0) {
                dispatch(getLists());
            }
        } catch (e) {
            alert("deleteList: "+e);
        }
    }

    export const addElement = (urlArr, prodId) => async (dispatch) => {
        try {
            for (let i=0; i<urlArr.length; i++) {
                let res = await listsAPI.addElement(urlArr[i], prodId);
                if (res.code === 0) {
                    //dispatch(getListByUrl(urlArr[i]));
                    dispatch(getProductById(prodId));
                }
            }
        } catch (e) {
            alert("addElement: " + e);
        }
    }

export const deleteElement = (url, idArr) => async (dispatch) => {
    try {
        for (let i=0; i<idArr.length; i++) {
            let res = await listsAPI.deleteElement(url, idArr[i]);
            if (res.code === 0) {
                dispatch(getListByUrl(url));
            }
        }
    } catch (e) {
        alert("addElement: " + e);
    }
}

export default typesReducer;