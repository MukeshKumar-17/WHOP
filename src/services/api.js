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
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Mock validation
            if (!email || !password) {
                reject({ response: { data: { message: 'Email and password are required' } } });
                return;
            }

            // Mock successful login
            const isCreator = email.includes('creator');
            const role = isCreator ? 'creator' : 'user';

            if (password.length >= 6) {
                resolve({
                    data: {
                        token: `mock-jwt-token-${Date.now()}`,
                        user: {
                            id: isCreator ? 99 : 1,
                            name: isCreator ? 'Creator User' : 'Test User',
                            email,
                            role,
                        },
                    },
                });
            } else {
                reject({ response: { data: { message: 'Invalid credentials' } } });
            }
        }, 1000);
    });
};

export const register = async (name, email, password, role = 'user') => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!email || !password || !name) {
                reject({ response: { data: { message: 'All fields are required' } } });
                return;
            }

            resolve({
                data: {
                    token: `mock-jwt-token-${Date.now()}`,
                    user: {
                        id: Math.floor(Math.random() * 1000),
                        name,
                        email,
                        role,
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
