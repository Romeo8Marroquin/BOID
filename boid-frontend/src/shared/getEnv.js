export const getEnvVariables = () => {

    return {
        VITE_BACKEND_ROOT: import.meta.env.VITE_BACKEND_ROOT,
        VITE_X_API_KEY: import.meta.env.VITE_X_API_KEY,
    }
}