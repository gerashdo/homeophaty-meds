import { getEnvVariables } from "../helpers/getEnvVariables"

const { VITE_API_BACKEND_URL } = getEnvVariables();

export const fetchAPI = ({
    endpoint = '', 
    token = null, 
    data = {}, 
    method='GET',
    queryParams = null,
}) => {

    let url = `${ VITE_API_BACKEND_URL }/${ endpoint }`;
    const headers = {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    }

    if( token ){
        headers['x-token'] = token
    }

    if( method === 'GET' ){
        // The query params are added if there is any
        if( queryParams ){
            url += '?' + ( new URLSearchParams( queryParams ) ).toString()
        }
        
        return fetch(url, {
            headers
        })
    }else{
        return fetch( url, {
            method,
            headers,
            body: JSON.stringify( data )
        })
    }
}