import axios from 'axios';
import { getEnvVariables } from './getEnv';

const { VITE_BACKEND_ROOT, VITE_X_API_KEY } = getEnvVariables();

export const boidApi = axios.create({
    baseURL: VITE_BACKEND_ROOT,
    headers: {
        'x-api-key': VITE_X_API_KEY
    }
})