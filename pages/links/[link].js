import React, { useContext, useState } from 'react';
import { EyeOffIcon } from '@heroicons/react/solid';

import appContext from '../../context/app/appContext';
import clientAxios from "../../config/axios";
import Layout from "../../components/Layout";
import Alert from '../../components/Alert';

export async function getServerSideProps({params}){
    const { link } = params;
    
    //traer datos dinamicamente
    const result = await clientAxios.get(`/api/links/${link}`);

    return {
        props: {
            link: result.data   //este link lo leo abajo en Link
        }
    }
}

export async function getServerSidePaths(){ 
    //routing dinamico
    const links = await clientAxios.get('/api/links')

    return {
        paths: links.data.links.map(link => ({
            params: { link : link.url }
        })),
        fallback: false    //para mostrar 404
    }
}





//Enlace
const Link = ({ link }) => {

    const AppContext = useContext(appContext)
    const { showAlert, message_file } = AppContext;

    const [hasPassword, setHasPassword] = useState(link.passwordFile);
    const [password, setPassword] = useState(''); //
    const [showPassword, setShowPassword] = useState(false); // show/hide password from form

    const checkPassword = async (e) => {
        e.preventDefault();

        const data = {
            password
        }


        try {
            const result = await clientAxios.post(`/api/links/${link.link}`, data)
            // console.log(result)
            setHasPassword(result.data.password)
            
        } catch (error) {
            // console.log(error.response.data.msg);
            showAlert(error.response.data.msg);
        }

    }

    return (
        <>
            <Layout>
                {
                    hasPassword ? (
                        <>
                            <p className="text-center">Archivo protegido por contraseña. Por favor ingrese el password.</p>

                            { message_file && <Alert succesful={ false } /> }

                            <div className="flex justify-center mt-5">
                                <div className="w-full max-w-lg">
                                    <form 
                                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 m-4"
                                        onSubmit={ e => checkPassword(e) }
                                    >
                                        <div className="mb-4">
                                            <label 
                                                className="block text-black text-sm font-bold mb-2"
                                                htmlFor="password"
                                            >
                                                Password
                                            </label>
                                            <div className="w-full flex flex-col items-end">
                                                <input
                                                    type={showPassword ? "text" : "password"} 
                                                    // type="text"
                                                    className="relative shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    id="password"
                                                    placeholder="Password del enlace"
                                                    value={password}
                                                    onChange={ e => setPassword(e.target.value) }
                                                />
                                                <div className="absolute">
                                                    <EyeOffIcon 
                                                        className="relative w-5 mt-2 mr-2 text-red-800" 
                                                        onClick={() => setShowPassword( !showPassword ) }
                                                    />
                                                </div>

                                            </div>

                                        </div>

                                        <input
                                            type="submit"
                                            className="bg-red-800 hover:bg-red-900 w-full p-2 mt-2 text-white uppercase rounded-lg"
                                            value="Comprobar Password"
                                        />
                                    </form>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="text-4xl text-center text-gray-700"> Descarga tu archivo:  </h1>
                            <div className="flex items-center justify-center mt-10">
                                <a 
                                    href={`${process.env.backendURL}/api/files/${link.file}`} 
                                    className="bg-red-800 hover:bg-red-900 text-center px-10 py-3 rounded uppercase text-white cursor-pointer"
                                    download
                                >
                                    Descargar Aqui
                                </a>
                            </div>
                        </>
                    )
                }

            </Layout>
        </>
    );
}
 
export default Link;
