import { REGISTER_SUCCESSFUL, 
        REGISTER_ERROR,
        CLEAN_ALERT,
        LOGIN_ERROR,
        LOGIN_SUCCESSFUL,
        AUTHENTICATED_USER,
        LOGOUT } from "../../types";



const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESSFUL:
            return {
                ...state,
                message: action.payload
            }
        case REGISTER_ERROR:
            return {    //esta de mas lo se.... pero me gusta q quede claro
                ...state,
                message: action.payload
            }
        case CLEAN_ALERT:
            return {
                ...state,
                message: null
            }
        case LOGIN_ERROR:
            return {
                ...state,
                message: action.payload
            }
        case LOGIN_SUCCESSFUL:
            //guardo el token en localStorage
            localStorage.setItem('token', action.payload)
            return {
                ...state,
                token: action.payload,
                authenticated: true
            }
            case AUTHENTICATED_USER:
                return {
                ...state,
                user: action.payload,
            }
        case LOGOUT:
            //remuevo el token de localstorage
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
                authenticated: null
            }

        default:
            return state;
    }
}

export default authReducer;