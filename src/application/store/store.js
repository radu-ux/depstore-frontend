import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import { productsReducer } from "../reducers/products_reducer";

const logger = createLogger({
    level: 'log'
})

const reducers = combineReducers({
    products: productsReducer
})
const store = createStore(reducers, applyMiddleware(logger, thunk))

export default store