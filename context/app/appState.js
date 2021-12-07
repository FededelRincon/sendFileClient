import React, { useReducer } from 'react';

import appContext from './appContext';
import appReducer from './appReducer';

import { SHOW_ALERT,
    HIDE_ALERT,
    UPLOAD_FILE,
    UPLOAD_FILE_SUCCESSFUL,
    UPLOAD_FILE_ERROR,
    CREATE_LINK_SUCCESSFUL,
    CREATE_LINK_ERROR } from '../../types';

import clientAxios from '../../config/axios';
    

const appState = ({children}) => {

    const initialState = {
        message_file: null,
        nameHash: '',
        nameOriginal: '',
        uploading: false,
        downloads: 1,
        password: '',
        author: null, 
        url: ''
        // url: null
    }
    const [state, dispatch] = useReducer(appReducer, initialState);


    //show alert
    const showAlert = (msg) => {
        dispatch({
            type: SHOW_ALERT,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT,
            });
            
        }, 3000);
    }

    // send file to backend
    const uploadFile = async ( formData, fileName ) => {
        
        dispatch({
            type: UPLOAD_FILE
        })

        try {

            const result = await clientAxios.post('/api/files', formData)
            // console.log(result.data);
            dispatch({
                type: UPLOAD_FILE_SUCCESSFUL,
                payload: {
                    nameHash: result.data.file,        
                    nameOriginal: fileName,
                }
                
            })
            
        } catch (error) {
            // console.log(error);
            dispatch({
                type: UPLOAD_FILE_ERROR,
                payload: error.response.data.msg
            })
        }


    }

    // create a link after upload a file
    const createLink = async () => {
        const data = {
            name: state.nameHash,
            original_name: state.nameOriginal,
            downloads: state.downloads,
            password: state.password,
            author: state.author
        }

        try {
            const result = await clientAxios.post('/api/links', data);
            console.log(result.data);
            dispatch({
                type: CREATE_LINK_SUCCESSFUL,
                payload: result.data.msg
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <appContext.Provider
            value={{
                //states
                message_file: state.message_file,
                nameHash: state.nameHash,
                nameOriginal: state.nameOriginal,
                uploading: state.uploading,
                downloads: state.downloads,
                password: state.password,
                author: state.author,
                url: state.url,

                //functions
                showAlert,
                uploadFile,
                createLink,
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default appState;