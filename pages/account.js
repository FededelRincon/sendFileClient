import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import authContext from '../context/auth/authContext';

import Alert from '../components/Alert';


// CrearCuenta para delaTorre
const Account = () => {

    // AuthState
    const AuthContext = useContext(authContext);
    const { message, registerUser, authenticated } = AuthContext;

    // Next router
    const router = useRouter();

    // form con formik y yup
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('El Nombre es obligatorio'),
            email: Yup.string()
                        .email('El email no es valido')
                        .required('El Email es obligatorio'),
            password: Yup.string()
                        .required('El Password es obligatorio')
                        .min(6, 'El Password debe contener al menos 6 caracteres')
        }),
        onSubmit: (valores) => {
            registerUser(valores);
            setTimeout(() => {
                router.push('/');
            }, 3000);
        }
    });



    return (
        <>
            <Layout>
                <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                    <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Crear Cuenta</h2>

                    {
                        message && <Alert />
                    }

                    <div className="flex justify-center mt-5">
                        <div className="w-full max-w-lg">

                            <form 
                                className="bg-white rounded shadow-md px-8 pt-6 pb-8 m-4"
                                onSubmit={formik.handleSubmit}
                            >
                                <div className="mb-4">
                                    <label 
                                        className="block text-black text-sm font-bold mb-2"
                                        htmlFor="name"
                                    >
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        id="name"
                                        placeholder="Nombre de Usuario"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {
                                        formik.touched.name && formik.errors.name && 
                                        // formik.errors.name && 
                                        (
                                            <div className="my-2 bg-gray-200 border-l-4 border-r-4  border-red-500 text-red-700 p-2">
                                                <p>{formik.errors.name}</p>
                                            </div>
                                        )
                                    }

                                </div>

                                <div className="mb-4">
                                    <label 
                                        className="block text-black text-sm font-bold mb-2"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        id="email"
                                        placeholder="ejemplo@ejemplo.com"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {
                                        formik.touched.email && formik.errors.email && 
                                        (
                                            <div className="my-2 bg-gray-200 border-l-4 border-r-4  border-red-500 text-red-700 p-2">
                                                <p>{formik.errors.email}</p>
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-4">
                                    <label 
                                        className="block text-black text-sm font-bold mb-2"
                                        htmlFor="password"
                                    >
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        id="password"
                                        placeholder="Password de Usuario"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {
                                        formik.touched.password && formik.errors.password && 
                                        (
                                            <div className="my-2 bg-gray-200 border-l-4 border-r-4  border-red-500 text-red-700 p-2">
                                                <p>{formik.errors.password}</p>
                                            </div>
                                        )
                                    }
                                </div>

                                <input
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 w-full p-2 mt-2 text-white uppercase rounded-lg"
                                    value="Crear Cuenta"
                                />

                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
 
export default Account;