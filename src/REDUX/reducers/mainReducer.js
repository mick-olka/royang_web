import {checkAuth} from "./adminReducer";
import {getProducts} from "./productsReducer";
import {getLists} from "./listsReducer";
import {getSlides} from "./sliderReducer";
import {getAllText} from "./textReducer";
import {getColors} from "./photosReducer";
import {addItemToCart} from "./cartReducer";

const SET_INITIALIZED_SUCCESS = "mainReducer/SET_INITIALIZED_SUCCESS";
const SET_ITEMS_IDS_ARRAY = "mainReducer/SET_ITEMS_IDS_ARRAY";
const SET_IS_SERVER_ERROR = "mainReducer/SET_IS_SERVER_ERROR";

let initialState = {
    initialized: false,
    links: [
        {url: '/gallery', name: "Галерея Фото"},
        {url: '/colors', name: "Вибір Кольору"},
        {url: '/info#delivery', name: "Про Доставку"},
        {url: '/info#contacts', name: "Контакти"},
        {url: '/info#discounts', name: "Знижки"},
        {url: '/info#plastic_rotang', name: "Про Полі-Ротанг"},
        {url: '/info#rotang', name: "Про Ротанг"},
        {url: '/info#payment', name: "Оплата"},
    ],
    itemsIdsArr: [],
    apiURL: "http://192.168.1.162:7500",
    isServerError: false,
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        case SET_ITEMS_IDS_ARRAY:
            return {
                ...state,
                itemsIdsArr: action.idsArr,
            }

        case SET_IS_SERVER_ERROR:
            return {...state, isServerError: action.isError}

        default:
            return state;
    }
};

const setInitializedSuccessAC = () => ({type: SET_INITIALIZED_SUCCESS});
export const setItemsIdsArrAC = (idsArr) => ({type: SET_ITEMS_IDS_ARRAY, idsArr});
export const setIsServerErrorAC = (isError) => ({type: SET_IS_SERVER_ERROR, isError});

const downloadLocalStorage = (dispatch) => {
    if (localStorage.cart) {
        let cart = JSON.parse(localStorage.cart);
        cart.map(i => {
            dispatch(addItemToCart(i));
        });
    }
}

//=====THUNKS=======

export const initApp = (page, limit) =>
    async (dispatch) => {
        try {
            downloadLocalStorage(dispatch);
            await Promise.all([dispatch(checkAuth()), dispatch(getSlides()),
                dispatch(getProducts(page, limit)), dispatch(getLists()), dispatch(getAllText()), dispatch(getColors())]);
    } catch (e) {
        console.log(e);
        setIsServerErrorAC(true);
    }
        dispatch(setInitializedSuccessAC());
    }

export default mainReducer;