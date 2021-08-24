import {checkAuth} from "./adminReducer";
import {getProducts} from "./productsReducer";
import {getLists} from "./typesReducer";

const SET_INITIALIZED_SUCCESS = "mainReducer/SET_INITIALIZED_SUCCESS";

let initialState = {
    initialized: false,
    links: [
        {url: '/', name: "Main"},
        {url: '/info', name: "Info"},
        {url: '/admin', name: "admin"},
    ],
    apiURL: "http://192.168.1.162:7500",
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
};

const setInitializedSuccessAC = () => (
    {type: SET_INITIALIZED_SUCCESS}
);

//=====THUNKS=======

export const initApp = () =>
    async (dispatch) => {
        try {
            await Promise.all([dispatch(checkAuth()), dispatch(getProducts()), dispatch(getLists())]);
    } catch (e) {
        //console.log(e);
    }
        dispatch(setInitializedSuccessAC());
        //setTimeout(()=> dispatch(setInitializedSuccessAC()), 500);   //  promise
    }

export default mainReducer;