import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Mock Services
export const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'test@example.com' && password === 'password') {
                resolve({
                    data: {
                        token: 'mock-jwt-token-123',
                        user: {
                            id: 1,
                            name: 'Test User',
                            email: 'test@example.com',
                        },
                    },
                });
            } else {
                reject({ response: { data: { message: 'Invalid credentials' } } });
            }
        }, 1000);
    });
};

export const register = async (name, email, password) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    token: 'mock-jwt-token-456',
                    user: {
                        id: 2,
                        name,
                        email,
                    },
                },
            });
        }, 1000);
    });
};

export const fetchProducts = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: [
                    { id: 1, name: 'Premium Pass', price: 29.99, description: 'Access to premium features' },
                    { id: 2, name: 'Creator Bundle', price: 49.99, description: 'Tools for creators' },
                    { id: 3, name: 'Basic Access', price: 9.99, description: 'Standard entry level' },
                ],
            });
        }, 800);
    });
};

export default api;
