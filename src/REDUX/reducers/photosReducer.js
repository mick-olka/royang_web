import {photosAPI} from "../../API/api";
import {getProductById} from "./productsReducer";

//const SET_THUMBNAIL = "photosReducer/SET_THUMBNAIL"

let initialState = {
    //thumbnail: null,
}

const photosReducer = (state=initialState, action) => {
    switch (action.type) {
        // case SET_THUMBNAIL:
        //     return {
        //         ...state, thumbnail: action.thumbnail
        //     }
        default:
            return state;
    }
}

//====================================

export const uploadThumbnail = (id, thumbnail) => async (dispatch) => {
    try {
            let res = await photosAPI.setThumbnail(id, thumbnail);
            if (res.code === 0) {
                //
            }
    } catch (e) {
        alert("setThumbnail: "+e);
    }
}

export const addPhotos = (id, files, mainColor, pillColor) => async (dispatch) => {
    try {
        let res = await photosAPI.addPhotos(id, files, mainColor, pillColor);
        if (res.code === 0) {
            dispatch(getProductById(id));
        }
    } catch (e) {
        alert("addPhotos: "+e);
    }
}

export const deletePhotos = (prodId, photosId) => async (dispatch) => {
    try {
            let res = await photosAPI.deletePhotos(prodId, photosId);
            if (res.code === 0) {
                //console.log('deleted');
            }
            dispatch(getProductById(prodId));
    } catch (e) {
        alert("deletePhotos: "+e);
    }
}

export default photosReducer;