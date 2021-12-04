import React from 'react';
import Link from 'next/link';


const Header = () => {
    return (
        <>
            <header className="py-8 flex flex-col md:flex-row items-center justify-between">
                <Link href="/">
                    <img className="w-64 mb-8 md:mb-0" src="logo2.svg" />
                {/* falta que aparezca la manito */}
                </Link>

                <div>
                    <Link href="/login">
                        <a className="bg-green-600 px-6 py-4 rounded-lg text-white uppercase mr-3 hover:bg-green-700">Iniciar sesion</a>
                    </Link>

                    <Link href="/account">
                        <a className="bg-blue-400 px-6 py-4 rounded-lg text-white uppercase hover:bg-blue-500">Crear Cuenta</a>
                    </Link>
                </div>

            </header>
        </>
    );
}
 
export default Header;