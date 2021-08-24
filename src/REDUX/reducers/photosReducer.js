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

export const addPhoto = (id, file, mainColor, pillColor) => async (dispatch) => {
    try {
        let res = await photosAPI.addPhoto(id, file, mainColor, pillColor);
        if (res.code === 0) {
            dispatch(getProductById(id));
        }
    } catch (e) {
        alert("addPhoto: "+e);
    }
}

export const deletePhotos = (id, fileNameArr) => async (dispatch) => {
    try {
        for (let i=0; i<fileNameArr.length; i++) {
            let res = await photosAPI.deletePhoto(id, fileNameArr[i]);
            if (res.code === 0) {
                //console.log('deleted');
            }
        }
            dispatch(getProductById(id));
    } catch (e) {
        alert("deletePhoto: "+e);
    }
}

export default photosReducer;