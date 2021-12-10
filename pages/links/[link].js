import Layout from "../../components/Layout";
import clientAxios from "../../config/axios";


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
    console.log(link)
    return (
        <>
            <Layout>
                <h1 className="text-4xl text-center text-gray-700"> Descarga tu archivo:  </h1>
                <div className="flex items-center justify-center mt-10">
                    <a 
                        href={`${process.env.backendURL}/api/files/${link.file}`} 
                        className="bg-red-500 text-center px-10 py-3 rounded uppercase text-white cursor-pointer"
                        download
                    >
                        Aqui
                    </a>
                </div>
            </Layout>
        </>
    );
}
 
export default Link;
