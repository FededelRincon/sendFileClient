import React, { useReducer } from 'react';
import authContext from "./authContext";
import authReducer from './authReducer';

import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import { REGISTER_SUCCESSFUL, 
        REGISTER_ERROR, 
        CLEAN_ALERT,
        LOGIN_SUCCESSFUL,
        LOGIN_ERROR,
        AUTHENTICATED_USER,
        LOGOUT } from '../../types';



const AuthState = ({ children }) => {

    // InitialState
    const initialState = {
        token: (typeof window !== 'undefined') ? localStorage.getItem('token') : '',
        authenticated: null,
        user: null,
        message: null,
    }

    // Reducer
    const [state, dispatch] = useReducer(authReducer, initialState);


    // Register new user
    const registerUser = async (data) => {

        try {
            const response = await clientAxios.post('/api/users', data)
            dispatch({
                type: REGISTER_SUCCESSFUL,
                payload: response.data.msg
            })

        } catch (error) {
            dispatch({
                type: REGISTER_ERROR, 
                payload: error.response.data.msg
            })
        }

        // it try or catch... clean alert after 3 seconds
        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 3000);
    }


    // Log in
    const logIn = async (data) => {
        try {
            const response = await clientAxios.post('/api/auth', data)
            dispatch({
                type: LOGIN_SUCCESSFUL,
                payload: response.data.token
            })


        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }      

        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 3000);  
    }

    // authenticated user from JWT
    const authenticatedUser = async () => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }

            try {
                const response = await clientAxios.get('/api/auth');
                // console.log(response)
                if( response.data.user ){
                    dispatch({
                        type: AUTHENTICATED_USER,
                        payload: response.data.user
                    })
                }
                
            } catch (error) {
                // console.log(error.response)
                dispatch({
                    type: LOGIN_ERROR,
                    payload: error.response.data.msg
                })
            }
            //creo q falto esto
            // setTimeout(() => {
            //     dispatch({
            //         type: CLEAN_ALERT
            //     })
            // }, 3000);  

    }


    // Close session
    const logOut = () => {
        dispatch({
            type: LOGOUT,
        })
    }




    return (
        <authContext.Provider 
            value={{ 
                //states
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,

                //functions
                registerUser,
                logIn,
                authenticatedUser,
                logOut,
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;