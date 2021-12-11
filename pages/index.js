// import styles from '../styles/Home.module.css'
import React, { useContext, useEffect } from 'react';
import Link from 'next/link';

import Layout from '../components/Layout';
import Dropzone from '../components/Dropzone';
import Alert from '../components/Alert';

import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';


const Index = () => {

    // Extraer el usuario autenticado del storage
    const AuthContext = useContext(authContext);
    const { authenticatedUser } = AuthContext;

    // Extraer el mensaje error de archivos
    const AppContext = useContext(appContext);
    const { message_file, url } = AppContext;

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            console.log('entre al if...')
            authenticatedUser();
        }

        /* eslint-disable */
    }, [])

    return (
        <>
            <Layout>
                <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                    
                    {
                        url ? (
                            <>
                                <p className="text-center text-2xl mt-10">
                                    <span className="font-bold text-red-700 text-3xl uppercase"> Tu URL es: </span> 
                                    { `${process.env.frontendURL}/links/${url}` }
                                </p>
                                <button
                                    type="button"
                                    className="bg-red-800 hover:bg-red-900 w-full p-2 mt-8 text-white uppercase rounded-lg"
                                    onClick={() => navigator.clipboard.writeText( `${process.env.frontendURL}/links/${url}` )}
                                >
                                    Copiar Enlace
                                </button>
                            </>
                        ) : (
                            <>
                                { message_file && <Alert /> }
                                <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                                    <Dropzone />
                                    
                                    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                                        <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Compartir archivos de forma sencilla y privada</h2>
                                        <p className="text-lg leading-loose">
                                            <span className="text-red-700 font-bold">SendFiles</span> te permite compartir cualquier tipo de archivos con un cifrado extremo y tener la seguridad que va a ser eliminado despues de su descarga. Asique puedes tener la seguridad para compartir todo tipo de archivos privados y saber que no se van a poder filtrar por ningun motivo.
                                        </p>
                                        <Link href="/account" >
                                            <a className="text-red-700 font-bold text-lg hover:text-red-700">Crea tu cuenta para enviar archivos de un mayor tamaño</a>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    
                </div>
                <footer className="text-center border-t-2 border-red-800 pt-2">
                    <div>
                        Sitio creado por FDR. Todos los derechos reservados &copy;
                    </div>
                </footer>
            </Layout>
        </>
    );
}
 
export default Index;