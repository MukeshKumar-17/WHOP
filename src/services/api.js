import axios from 'axios';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

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
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// --- MOCK DATA & HELPERS ---
const MOCK_PRODUCTS = [
    { id: 1, title: 'Premium Trading Signals', description: 'Daily crypto signals.', price: 49.99, type: 'subscription', creatorName: 'TradePro' },
    { id: 2, title: 'Fitness Masterclass', description: '12-week program.', price: 199.00, type: 'one-time', creatorName: 'FitLife Academy' },
    { id: 3, title: 'Digital Art Pack', description: '500+ brushes.', price: 25.00, type: 'one-time', creatorName: 'CreativeStudio' },
    { id: 4, title: 'SaaS Founder Community', description: 'Exclusive community.', price: 99.00, type: 'subscription', creatorName: 'SaaS Hub' },
    { id: 5, title: 'Python Course', description: 'Zero to Hero.', price: 14.99, type: 'one-time', creatorName: 'CodeWithMe' }
];

const mockDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// --- SERVICES ---

// Auth
export const login = async (email, password) => {
    if (USE_MOCK) {
        await mockDelay();
        if (password.length < 6) throw { response: { data: { message: 'Invalid credentials' } } };
        const isCreator = email.includes('creator');
        return {
            data: {
                token: `mock-token-${Date.now()}`,
                user: {
                    id: isCreator ? 99 : 1,
                    name: isCreator ? 'Creator User' : 'Test User',
                    email,
                    role: isCreator ? 'creator' : 'user'
                }
            }
        };
    }
    return api.post('/auth/login', { email, password });
};

export const register = async (name, email, password, role = 'user') => {
    if (USE_MOCK) {
        await mockDelay();
        return {
            data: {
                token: `mock-token-${Date.now()}`,
                user: { id: Math.floor(Math.random() * 1000), name, email, role }
            }
        };
    }
    return api.post('/auth/register', { name, email, password, role });
};

// Products
export const fetchProducts = async () => {
    if (USE_MOCK) {
        await mockDelay();
        return { data: MOCK_PRODUCTS };
    }
    return api.get('/products');
};

export const fetchProductById = async (id) => {
    if (USE_MOCK) {
        await mockDelay();
        const product = MOCK_PRODUCTS.find(p => p.id === parseInt(id));
        return product ? { data: product } : Promise.reject({ message: 'Not Found' });
    }
    return api.get(`/products/${id}`);
};

// Access
export const checkAccess = async (productId) => {
    if (USE_MOCK) {
        await mockDelay(400);
        // Mock: User 1 has access to prods 1 & 3
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.id === 1 && [1, 3].includes(parseInt(productId))) return true;
        return false;
    }
    try {
        const response = await api.get(`/access/${productId}`);
        return response.data.hasAccess;
    } catch (error) {
        return false;
    }
};

// Creator Actions
export const createProduct = async (productData) => {
    if (USE_MOCK) {
        await mockDelay(1500);
        return { data: { success: true, product: { ...productData, id: Date.now() } } };
    }
    return api.post('/products', productData);
};

export const fetchCreatorProducts = async () => {
    if (USE_MOCK) {
        await mockDelay();
        return { data: MOCK_PRODUCTS };
    }
    return api.get('/creator/products');
};

export const deleteProduct = async (productId) => {
    if (USE_MOCK) {
        await mockDelay();
        return { data: { success: true } };
    }
    return api.delete(`/products/${productId}`);
};

// Payments
export const createCheckoutSession = async (productId) => {
    if (USE_MOCK) {
        await mockDelay(1500);
        // Mock redirect to success page after delay
        return { data: { url: '/payment/success' } };
    }
    return api.post('/payments/create-checkout-session', { productId });
};

export default api;
