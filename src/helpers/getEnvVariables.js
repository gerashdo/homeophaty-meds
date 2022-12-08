

export const getEnvVariables = () => {

    // import.meta.env;

    return {
        VITE_API_BACKEND_URL: import.meta.env.VITE_API_BACKEND_URL
        // ...import.meta.env
    }

}