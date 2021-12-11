import React, { useContext, useState } from 'react';
import { EyeOffIcon } from '@heroicons/react/solid';
import appContext from '../context/app/appContext';



const Form = () => {

    // context App
    const AppContext = useContext(appContext);
    const { addPassword, numberDownloads } = AppContext;

    const [hasPassword, setHasPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="w-full mt-20">
                <div>
                    <label className="text-lg text-gray-800 mr-4">Eliminar tras:</label>
                    <select 
                        className="appearance-none w-full mt-2 bg-white border rounded border-gray-400 text-black py-3 px-4 pr-8 leading-none focus:outline-none focus:border-gray-500"
                        onChange = { (e) => numberDownloads( parseInt(e.target.value) )}
                    >
                        <option value="" disabled> --Seleccione una opcion-- </option>
                        <option value="1" defaultValue> 1 Descarga</option>
                        <option value="2"> 2 Descargas</option>
                        <option value="3"> 3 Descargas</option>
                        <option value="5"> 5 Descargas</option>
                        <option value="10"> 10 Descargas</option>
                    </select>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between items-center">
                        <label className="text-lg text-gray-800 mr-6">Proteger con contraseña:</label>
                        <input 
                            type="checkbox" 
                            className="mr-2 form-checkbox h-4 w-5 bg-red-700"
                            onChange={() => setHasPassword( !hasPassword ) }
                        />
                    </div>
                    {
                        hasPassword &&
                        (
                            <>
                                <div className="w-full flex flex-col items-end">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        className="appearance-none w-full mt-2 bg-white border rounded border-gray-400 text-black py-3 px-4 pr-8 leading-none focus:outline-none focus:border-gray-500" 
                                        onChange = { e => addPassword(e.target.value) }
                                    />
                                    <div className="absolute">
                                        <EyeOffIcon 
                                            className="relative w-5 mt-5 mr-2 text-red-800" 
                                            onClick={() => setShowPassword( !showPassword ) }
                                        />
                                    </div>
                                </div>
                            </>
                        )
                    }

                </div>
            </div>
        </>
    );
}
 
export default Form;