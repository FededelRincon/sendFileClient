import React, { useContext } from 'react';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';

const Alert = (succesful = false) => {  //si viene false va en rojo, si viene un true es mensaje exitoso

    console.log(succesful)
    //extraer msg de error para usuarios
    const AuthContext = useContext(authContext);
    const { message } = AuthContext;
    
    //extraer msg de error para archivos
    const AppContext = useContext(appContext);
    const { message_file } = AppContext;


    return (
        <>
            {
                succesful.succesful ? (
                    <>
                        <div className="bg-green-800 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto mb-4">
                            { message || message_file }
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-red-800 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto mb-4">
                            { message || message_file }
                        </div>
                    </>
                )
            }

        </>
    );
}
 
export default Alert;