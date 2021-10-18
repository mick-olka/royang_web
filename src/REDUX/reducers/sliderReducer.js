import {sliderApi} from "../../API/api";

const SET_SLIDES = "sliderReducer/SET_SLIDES";
// const CREATE_SLIDE = "sliderReducer/CREATE_SLIDE";
// const DELETE_SLIDE = "sliderReducer/DELETE_SLIDE";

let initialState = {
    slides: [],
}

const sliderReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_SLIDES:
            return {
                ...state, slides: [...action.slides]
            }

        default:
            return state;
    }
}

const setSlidesAC = (slides) => ({type: SET_SLIDES, slides});
// export const setListFormAC = (list) => ({type: SET_LIST_FORM, list});
// const setIsLoadingAC = (isLoading) => ({type: SET_IS_LOADING, isLoading});

//====================================

export const getSlides = () => async (dispatch) => {
    let response = await sliderApi.getSlides();
    dispatch(setSlidesAC(response.slides));
}

export const createSlide = (data) => async (dispatch) => {
    await sliderApi.createSlide(data);
    dispatch(getSlides());
}

export const deleteSlide = (id) => async (dispatch) => {
    await sliderApi.deleteSlide(id);
    dispatch(getSlides());
}

export default sliderReducer;