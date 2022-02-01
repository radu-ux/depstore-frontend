import { ADD_PRODUCT_FAILED, 
         ADD_PRODUCT_START, 
         ADD_PRODUCT_SUCCESS, 
         FETCH_PRODUCTS_FAILED, 
         FETCH_PRODUCTS_STARTED, 
         FETCH_PRODUCTS_SUCCESSFUL, 
         SHOW_ADD_PRODUCT_MODAL, 
         HIDE_ADD_PRODUCT_MODAL,
         SHOW_DELETE_PRODUCT_MODAL,
         HIDE_DELETE_PRODUCT_MODAL,
         DELETE_PRODUCT_START,
         DELETE_PRODUCT_SUCCESSFUL,
         DELETE_PRODUCT_FAILED, } from "../action_types/products_action_types"

const initialState = { 
    loading: false,
    add_product_loading: false,
    delete_product_loading: false,
    add_product_modal_visibility: false,
    delete_product_modal_visibility: false,
    productsArray: [],
    error: ""
}

export const productsReducer = (state = initialState, action) => { 
    switch(action.type) { 
        case FETCH_PRODUCTS_STARTED:
            return {
                ...state,
                loading: true,
            }
        case FETCH_PRODUCTS_SUCCESSFUL:
            return { 
                ...state,
                loading: false,
                productsArray: action.payload,
                error: ""
            }        
        case FETCH_PRODUCTS_FAILED:
            return { 
                ...state,
                loading: false,
                error: action.payload
            }
        case ADD_PRODUCT_START: 
            console.log(state)
            return {
                ...state, 
                add_product_loading: true
            }
        case ADD_PRODUCT_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                add_product_loading: false,
                productsArray: [...state.productsArray, action.payload],
                error: ""
            }
        case ADD_PRODUCT_FAILED: 
            return { 
                ...state, 
                add_product_loading: false,
                error: action.payload
            }
        case DELETE_PRODUCT_START:
            return { 
                ...state,
                delete_product_loading: true
            }
        case DELETE_PRODUCT_SUCCESSFUL:
            return { 
                ...state, 
                delete_product_loading: false,
                productsArray: state.productsArray.filter(product => product.id !== action.payload.id)
            }
        case DELETE_PRODUCT_FAILED: 
            return { 
                ...state,
                delete_product_loading: false,
                error: action.payload
            }
        case SHOW_ADD_PRODUCT_MODAL: 
            return { 
                ...state,
                add_product_modal_visibility: true
            }
        case HIDE_ADD_PRODUCT_MODAL: 
            return { 
                ...state, 
                add_product_modal_visibility: false
            }
        case SHOW_DELETE_PRODUCT_MODAL:
            return {
                ...state,
                delete_product_modal_visibility: true
            }
        case HIDE_DELETE_PRODUCT_MODAL: 
            return { 
                ...state,
                delete_product_modal_visibility: false
            }
        default: 
            return {
                ...state
            }
    }
}