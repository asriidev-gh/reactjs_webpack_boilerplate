import { combineReducers } from "redux";
// import itemReducer from "./items/itemsReducer";
import authReducer from "./auth/authReducer";
import errorReducer from "./auth/errorReducer";
import quizReducer from "./quiz/quizReducer";

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    quizzes: quizReducer,
});