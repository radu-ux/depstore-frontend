export const productsSelector = state => state.products
export const productsError = state => state.products.error
export const deleteProductModalVisibility = state => state.products.delete_product_modal_visibility
export const addProductModalVisibility = state => state.products.add_product_modal_visibility
export const addProductLoading = state => state.products.add_product_loading
export const deleteProductLoading = state => state.products.delete_product_loading