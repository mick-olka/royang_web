
const SET_PORTION_NUM = "productsReducer/SET_PORTION_NUM";
const SET_CURRENT_PAGE = "productsReducer/SET_CURRENT_PAGE";
const SET_TOTAL_PRODUCTS_COUNT = "productsReducer/SET_TOTAL_PRODUCTS_COUNT";

let initialState = {
        totalProductsCount: 0,
        currentPage: 1,
        portionNum: 1,
        portionSize: 3,
        pageLimit: 2,
}

const paginatorReducer = (state=initialState, action) => {
    switch (action.type) {

        case SET_PORTION_NUM:
            return {
                ...state, portionNum: action.portionNum,
            }

        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage,
            }

        case SET_TOTAL_PRODUCTS_COUNT:
            return {
                ...state, totalProductsCount: action.count,
            }

        default:
            return state;
    }
}

export const setPortionNumAC = (portionNum) => ({type: SET_PORTION_NUM, portionNum});
export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalProductsCountAC = (count) => ({type: SET_TOTAL_PRODUCTS_COUNT, count});

//====================================

export default paginatorReducer;