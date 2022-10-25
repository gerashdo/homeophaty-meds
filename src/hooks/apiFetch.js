import { getEnvVariables } from "../helpers/getEnvVariables"

const { VITE_API_BACKEND_URL } = getEnvVariables();

export const fetchSinToken = ( endpoint, data, method='GET' ) => {
    const url = `${ VITE_API_BACKEND_URL }/${ endpoint }`;

    if( method === 'GET' ){
        return fetch(url)
    }
}