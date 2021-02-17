import { GET_QUIZZES, QUIZZES_LOADED, ADD_QUIZ, DELETE_QUIZ } from "./quizTypes";

export const getQuizzes = (quizzes) => {
    // console.log("GetQuizzes Actions is called!");
    return { type: GET_QUIZZES, payload: quizzes }
}

export const quizzesLoaded = (quizzes) => {
    // console.log("quizzesLoaded Actions is called!"+JSON.stringify(quizzes));
    return { type: QUIZZES_LOADED, payload: quizzes }
}