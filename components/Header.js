import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';


const Header = () => {

    // Extraer el usuario autenticado del storage
    const AuthContext = useContext(authContext);
    const { authenticatedUser, user, logOut } = AuthContext;

    
    // useEffect(() => {
    //     authenticatedUser();
    // }, [])


    return (
        <>
            <header className="py-8 flex flex-col md:flex-row items-center justify-between">
                <Link href="/">
                    <img className="w-64 mb-8 md:mb-0" src="logo2.svg" />
                {/* falta que aparezca la manito */}
                </Link>

                <div>
                    {
                        user ? ( 
                            <>
                                <div className="flex items-center">
                                    <p className="mr-5">Hola {user.name}</p>
                                    <button 
                                        className="bg-green-600 px-6 py-4 rounded-lg text-white uppercase mr-3 hover:bg-green-700"
                                        onClick={()=> logOut() }
                                    >
                                        Cerrar sesion
                                    </button>
                                </div>
                            </>
                        ):( 
                            <>
                                <Link href="/login">
                                    <a className="bg-red-700 px-6 py-4 rounded-lg text-white uppercase mr-3 hover:bg-red-800">Iniciar sesion</a>
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