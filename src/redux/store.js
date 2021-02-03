import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducers";

import { persistReducer } from "redux-persist";
import storage from  "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
    key: "root",
    storage,
    stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

const initialState = {};
const middleware = [thunk];

const devTools = process.env.NODE_ENV === 'development' ? 
window.__REDUX_DEVTOOLS_EXTENSION__ &&
window.__REDUX_DEVTOOLS_EXTENSION__() : null;

const store = createStore(persistedReducer, initialState, compose(
    applyMiddleware(...middleware),    
    devTools
));

export default store;