import { USER_LOADED, 
         USER_LOADING,
         AUTH_ERROR,
         LOGIN_SUCCESS,
         LOGIN_FAIL,
         LOGOUT_SUCCESS,
         REGISTER_SUCCESS,
         REGISTER_FAIL,
         FORGOTPASSWORD_SENT,
         FORGOTPASSWORD_FAIL,
         RESET_PASSWORD,
         RESETPASSWORD_SUCCESS,
         RESETPASSWORD_FAIL} from './authTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export default function (state = initialState, action){
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
            
        case USER_LOADED: 
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,                
            }
               
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }

        
        case RESETPASSWORD_FAIL:
        case FORGOTPASSWORD_SENT:
            localStorage.removeItem('token');
            return {
                ...state,
                isForgetPassword: true,   
                isForgetPasswordEmail: action.payload.email,             
                msg: action.payload.msg,
                isAuthenticated: false,
                isLoading: false,                
            }
        
                
        case RESET_PASSWORD:            
            localStorage.removeItem('token');
            return initialState;
        case RESETPASSWORD_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                isForgetPassword: false,
                isForgetPasswordEmail: null,
                isResetPasswordSuccess: true,
                msg: null,
                isAuthenticated: false,
                isLoading: false,                
            }
        default:
            return state;
    }
}