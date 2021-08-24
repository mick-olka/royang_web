import {adminAPI} from "../../API/api";

const IS_ADMIN = "adminReducer/IS_ADMIN";
const SET_IS_FETCHING = "adminReducer/SET_IS_FETCHING";

let initialState = {
    isAdmin: false,
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {

        case IS_ADMIN:
            return {
                ...state,
                isAdmin: action.isAdmin
            }

        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }

        default:
            return state;
    }
};

export const setIsAdminAuthAC = (isAdmin) => (
    {type: IS_ADMIN, isAdmin}
);

//=====THUNKS=======

// const setIsAdmin = (isAdmin) =>
//     async (dispatch) => {
//     let res = await adminAPI.getAuth();
//     if (res.data.code===0) {
//         dispatch(setIsAdminAuthAC(true))
//     }
//     // setTimeout(()=> dispatch(setIsAdminAuthAC(isAdmin)), 500);   //  promise
// }

export const checkAuth = () =>
    async (dispatch) => {
        let res = await adminAPI.getAuth();
        if (res.code === 0) {
            dispatch(setIsAdminAuthAC(true));
        } else {
            dispatch(setIsAdminAuthAC(false));
        }
    }

export const authAdmin = (password) =>
    async (dispatch) => {
    try {
        let res = await adminAPI.setAuth(password);
        if (res.code === 0) {
            dispatch(setIsAdminAuthAC(true));
        } else {
            dispatch(setIsAdminAuthAC(false));
        }
    } catch (e) {

    }
}

export const changePW = (password, oldPassword) =>
    async (dispatch) => {
        try {
            let res = await adminAPI.changePW(password, oldPassword);
            if (res.code===0) checkAuth();
        } catch (e) {

        }
    }

export const deleteAdminAuth = () =>
    async (dispatch) => {
        let res = await adminAPI.deleteAuth();
        if (res.code===0) dispatch(setIsAdminAuthAC(false));
    }

export default adminReducer;