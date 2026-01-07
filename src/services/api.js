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

// Response interceptor for handling 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Auto-logout if token is invalid or expired
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth Services
export const login = async (email, password) => {
    return api.post('/auth/login', { email, password });
};

export const register = async (name, email, password, role = 'user') => {
    return api.post('/auth/register', { name, email, password, role });
};

// Product Services
export const fetchProducts = async () => {
    return api.get('/products');
};

export const fetchProductById = async (id) => {
    return api.get(`/products/${id}`);
};

export const checkAccess = async (productId) => {
    try {
        const response = await api.get(`/access/${productId}`);
        return response.data.hasAccess;
    } catch (error) {
        return false;
    }
};

export const createProduct = async (productData) => {
    return api.post('/products', productData);
};

export const fetchCreatorProducts = async () => {
    return api.get('/creator/products');
};

export const deleteProduct = async (productId) => {
    return api.delete(`/products/${productId}`);
};

// Payment Services
export const createCheckoutSession = async (productId) => {
    return api.post('/payments/create-checkout-session', { productId });
};

export default api;
