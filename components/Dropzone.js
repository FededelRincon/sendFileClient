import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';
import Form from '../components/Form'

const Dropzone = () => {

    //context app
    const AppContext = useContext(appContext);
    const { uploading, showAlert, uploadFile, createLink} = AppContext;

    //context auth
    const AuthContext = useContext(authContext);
    const { user, authenticated} = AuthContext;

    const onDropRejected = () => {
        showAlert('No se pudo subir, el Limite para usuario no registrados es de 1MB, obten tu cuenta gratis para subir archivos sin limite de tamaño');
    }

    const onDropAccepted = useCallback( async ( acceptedFiles ) => { //el useCallback es para q NO renderize por cada byte que sube

        // Build a form Data    -  //xq al archivo lo mandamos desde form Data -> file , no como json
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        
        const fileName = acceptedFiles[0].path

        uploadFile( formData, fileName );

        
    }, []);

    
    // Dropzone content
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });
    
    const files = acceptedFiles.map( file => (
        <li key={file.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
            <p className="text-center font-bold text-xl"> { file.path } </p> 
            <p className="text-center text-sm text-gray-500"> { (file.size / Math.pow(1024, 2)).toFixed(2) } MB </p> 
        </li>
    ))

    

    return (
        <>
            <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-4 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-200 px-4">
                {
                    acceptedFiles.length > 0 ? (
                        <>
                            <div className="mt-10 w-full">
                                <h4 className="text-2xl font-bold text-center mb-4">Archivos:</h4>
                                <ul>
                                    { files }
                                </ul>

                                {
                                    authenticated ? <Form /> : ''
                                }



                                {
                                    uploading ? (
                                        <p className="my-10 text-center text-gray-600">Subiendo Archivo... </p>
                                    ) : (
                                        <button
                                            type="button"
                                            className="bg-red-800 w-full py-3 rounded-lg text-white my-10 hover:bg-red-900"
                                            // onClick={ createLink() }
                                            onClick={ () => createLink() }
                                        >
                                            Crear Enlace
                                        </button>
                                    )
                                }

                                
                            </div>
                        </>
                    ) : (
                        <>
                            <div {...getRootProps({ className: 'dropzone w-full py-32'})} >
                                <input className="h-100" {...getInputProps() } />
                                    {
                                        isDragActive ? (
                                            <p className="text-2xl text-center text-gray-600"> Suelta aqui el archivo ... </p>
                                        ) : (
                                            <>
                                                <div className="text-center">
                                                <p className="text-2xl text-center text-gray-600">Selecciona un archivo y arrastralo aqui...</p>
                                                <button className="bg-red-800 w-full py-3 rounded-lg text-white my-10 hover:bg-red-900" type="button">
                                                    Selecciona archivos para subir
                                                </button>
                                                </div>
                                            </>
                                        )
                                    }
                            </div>
                        </>
                    )
                }

                

            </div>
        </>
    );
}
 
export default Dropzone;

