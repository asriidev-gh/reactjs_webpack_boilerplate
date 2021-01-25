import axios from 'axios';
import { returnErrors } from "./errorActions";
import { USER_LOADED, 
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL } from './authTypes';

// check token & load user
export const loadUser = () => (dispatch,getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });

    axios.get('api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
}

// Register User
export const register = ({ name,email,password,allowExtraEmails,acceptTermsAndCondition }) => dispatch => {    
    // const history = useHistory();

    // Headers
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({ name, email, password, allowExtraEmails, acceptTermsAndCondition });    
    
    axios.post(`${process.env.REACT_APP_EBOOKS_API}/user/register`, body, config)
        .then(res => {            
            if(res.data.code){                
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                })
                dispatch(returnErrors(res.data, res.data.status, "REGISTER_SUCCESS"));
                // history.push("/dashboard");
            }else{
                dispatch(returnErrors(res.data, res.data.status, "REGISTER_FAIL"));
                dispatch({
                    type: REGISTER_FAIL,                    
                })
            }            
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
            dispatch({
                type: REGISTER_FAIL
            })
        });
}

// Login User
export const login = ({ email, password }) => (dispatch) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'        
      }
    };
  
    // Request body
    const body = JSON.stringify({ email, password });
  
    axios
      .post(`${process.env.REACT_APP_EBOOKS_API}/user/login`, body, config)
      .then(res =>
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
        );
        dispatch({
          type: LOGIN_FAIL
        });
      });
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
    // Get token from localstorage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If token, add to headers
    if(token){
        config.headers['auth-token'] = token;
    }

    return config;
}

// Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};