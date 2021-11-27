
export const getProducts = (state) => {
    return state.productsReducer.products;
}

export const getUpdateProductProps = (state) => {
    return {
        productData: state.productsReducer.productData,
        isLoading: state.productsReducer.isLoading,
        lists: state.listsReducer.lists,
        newError: state.productsReducer.newError,
    };
}
