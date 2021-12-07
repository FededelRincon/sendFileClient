import React, { useContext } from 'react';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';

const Alert = () => {
    //extraer msg de error para usuarios
    const AuthContext = useContext(authContext);
    const { message } = AuthContext;
    
    //extraer msg de error para archivos
    const AppContext = useContext(appContext);
    const { message_file } = AppContext;


    return (
        <>
            <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto mb-4">
                { message || message_file }
            </div>
        </>
    );
}
 
export default Alert;