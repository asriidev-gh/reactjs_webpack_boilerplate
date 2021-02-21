import { GET_QUIZZES, QUIZZES_LOADED, ADD_ITEM, DELETE_ITEM } from "./quizTypes";

const initialState = {
    isLoading: false,
    quizzes:null
}

export default function(state = initialState, action){
    switch (action.type) {
        case GET_QUIZZES:
            // console.log("QuizReducer is called!");
            return { ...state,isLoading:true }   
        case QUIZZES_LOADED:
            if(action.payload){
                return { ...state,isLoading:false,quizzes:action.payload }
            }
            return { ...state,isLoading:false };
        default:
            return state;
    }
}