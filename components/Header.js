import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';


const Header = () => {

    //Routing
    const router = useRouter();


    // Extraer el usuario autenticado del storage
    const AuthContext = useContext(authContext);
    const { authenticatedUser, user, logOut } = AuthContext;

    // context de la app
    const AppContext = useContext(appContext);
    const { cleanState } = AppContext;

    
    useEffect(() => {
        authenticatedUser();
    }, [])


    const redirect = () => {
        router.push('/')
        cleanState();
    }

    return (
        <>
            <header className="py-8 flex flex-col md:flex-row items-center justify-between">
                <img
                    onClick={ () => redirect() }
                    className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo2.svg" 
                />

                <div>
                    {
                        user ? ( 
                            <>
                                <div className="flex items-center">
                                    <p className="mr-5">Hola {user.name}</p>
                                    <button 
                                        className="bg-black px-6 py-4 rounded-lg text-white uppercase mr-3 hover:bg-gray-700"
                                        onClick={()=> logOut() }
                                    >
                                        Cerrar sesion
                                    </button>
                                </div>
                            </>
                        ):( 
                            <>
                                <Link href="/login">
                                    <a className="bg-red-800 px-6 py-4 rounded-lg text-white uppercase mr-3 hover:bg-red-900">Iniciar sesion</a>
                                </Link>

                                <Link href="/account">
                                    <a className="bg-black px-6 py-4 rounded-lg text-white uppercase hover:bg-gray-700">Crear Cuenta</a>
                                </Link>
                            </>
                        )
                    }

                </div>

            </header>
        </>
    );
}
 
export default Header;