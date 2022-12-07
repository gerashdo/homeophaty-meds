import { getEnvVariables } from "../helpers/getEnvVariables"

const { VITE_API_BACKEND_URL } = getEnvVariables();

export const fetchAPI = ( endpoint, data, method='GET', token = null ) => {
    const url = `${ VITE_API_BACKEND_URL }/${ endpoint }`;
    const headers = {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    }

    if( token ){
        headers['x-token'] = token
    }

    if( method === 'GET' ){
        return fetch(url)
    }else{
        return fetch( url, {
            method,
            headers,
            body: JSON.stringify( data )
        })
    }
}