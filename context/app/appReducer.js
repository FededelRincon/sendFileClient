import { SHOW_ALERT,
    HIDE_ALERT,
    UPLOAD_FILE,
    UPLOAD_FILE_SUCCESSFUL,
    UPLOAD_FILE_ERROR,
    CREATE_LINK_SUCCESSFUL,
    CREATE_LINK_ERROR,
    CLEAN_STATE } from '../../types';


const appReducer = (state, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                message_file: action.payload
            }

        case HIDE_ALERT:
            return {
                ...state,
                message_file: null,
            }

        case UPLOAD_FILE:
            return {
                ...state,
                uploading: true
            }

        case UPLOAD_FILE_SUCCESSFUL:
            return {
                ...state,
                nameHash: action.payload.nameHash,
                nameOriginal: action.payload.nameOriginal,
                uploading: false
            }

        case UPLOAD_FILE_ERROR:
            return {
                ...state,
                message_file: action.payload,
                uploading: false
            }

        case CREATE_LINK_SUCCESSFUL:
            return {
                ...state,
                url: action.payload
            }

        case CREATE_LINK_ERROR:
            return {
                ...state,
                message_file: action.payload,
                uploading: false
            }

        case CLEAN_STATE:
            return {
                ...state,
                message_file: null,
                nameHash: '',
                nameOriginal: '',
                uploading: false,
                downloads: 1,
                password: '',
                author: null, 
                url: ''
            }



        default:
            return state;
    }
}

export default appReducer;