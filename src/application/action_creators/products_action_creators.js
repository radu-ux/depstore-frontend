import { ADD_PRODUCT_FAILED, ADD_PRODUCT_START, 
         ADD_PRODUCT_SUCCESS, FETCH_PRODUCTS_FAILED, 
         FETCH_PRODUCTS_STARTED, FETCH_PRODUCTS_SUCCESSFUL, 
         HIDE_DELETE_PRODUCT_MODAL, HIDE_ADD_PRODUCT_MODAL, 
         SHOW_DELETE_PRODUCT_MODAL, SHOW_ADD_PRODUCT_MODAL, 
         DELETE_PRODUCT_START, DELETE_PRODUCT_SUCCESSFUL, 
         DELETE_PRODUCT_FAILED } from "../action_types/products_action_types"

const fetchProductsStarted = () => {
    return { 
        type: FETCH_PRODUCTS_STARTED
    }
}

const fetchProductsSuccessful = products => { 
    return { 
        type: FETCH_PRODUCTS_SUCCESSFUL,
        payload: products
    }
}

const fetchProductsFailed = error => { 
    return {
        type: FETCH_PRODUCTS_FAILED,
        payload: error
    }
}

const addProductStart = () => { 
    return { 
        type: ADD_PRODUCT_START
    }
}

const addProductSuccess = newProduct => { 
    return { 
        type: ADD_PRODUCT_SUCCESS,
        payload: newProduct
    }
}

const addProductFailed = error => { 
    return { 
        type: ADD_PRODUCT_FAILED,
        payload: error
    }
}

const deleteProductStart = () => { 
    return {
        type: DELETE_PRODUCT_START
    }
}

const deleteProductSuccess = productToDelete => { 
    return {
        type: DELETE_PRODUCT_SUCCESSFUL,
        payload: productToDelete
    }
}

const deleteProductFailed = error => { 
    return { 
        type: DELETE_PRODUCT_FAILED,
        payload: error
    }
}

export const hideAddProductModal = () => { 
    return {
        type: HIDE_ADD_PRODUCT_MODAL
    }
}

export const showAddProductModal = () => { 
    return {
        type: SHOW_ADD_PRODUCT_MODAL
    }
} 

export const showDeleteProductModal = () => { 
    return {
        type: SHOW_DELETE_PRODUCT_MODAL
    }
}

export const hideDeleteProductModal = () => { 
    return { 
        type: HIDE_DELETE_PRODUCT_MODAL
    }
}

export const fetchProducts = () => { 
    return async dispatch => { 
        dispatch(fetchProductsStarted())
        try {
            const response = await fetch("http://localhost:3000/products")
            const json_response = await response.json()
            dispatch(fetchProductsSuccessful(json_response.products))
        } catch (error) { 
            dispatch(fetchProductsFailed(error))
        }
    }
}

export const addProduct = new_product => { 
    return async dispatch => { 
        dispatch(addProductStart())
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({product: new_product})
        }
        try { 
            const response = await fetch("http://localhost:3000/products", options)
            const json_response = await response.json()
            if(response.status === 422) { 
                dispatch(addProductFailed("Unprocessable Entity - Status 422"))
            } else if (response.status === 200) { 
                dispatch(addProductSuccess(json_response.product))
                dispatch(hideAddProductModal())
            }
        } catch (error) { 
            dispatch(addProductFailed(error))
        }
    }
}

export const deleteProduct = product => { 
    return async dispatch => { 
        try { 
            dispatch(deleteProductStart())
            const options = {
                method: "DELETE",
                headers: { 
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(product)
            }

            const response = await fetch(`http://localhost:3000/products/${product.id}`, options)
            if(response.status === 204) { 
                dispatch(deleteProductSuccess(product))
                dispatch(hideDeleteProductModal())
            } else { 
                dispatch(deleteProductFailed("Unable to delete product"))
            }
        } catch (error) { 
            dispatch(deleteProductFailed(error))
        }

    }
}