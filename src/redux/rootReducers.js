import { combineReducers } from "redux";
// import itemReducer from "./items/itemsReducer";
import authReducer from "./auth/authReducer";
import errorReducer from "./auth/errorReducer";

export default combineReducers({
    auth: authReducer,
    error: errorReducer
});