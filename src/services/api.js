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
                            id: isCreator ? 99 : 1, // User ID 1 is the 'customer'
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

const MOCK_PRODUCTS = [
    {
        id: 1,
        title: 'Premium Trading Signals',
        description: 'Get daily crypto and stock trading signals from top analysts. Includes access to our private Discord community and weekly webinars.',
        price: 49.99,
        type: 'subscription',
        creatorName: 'TradePro'
    },
    {
        id: 2,
        title: 'Fitness Masterclass',
        description: 'Complete 12-week body transformation program with meal plans, workout videos, and progress tracking tools.',
        price: 199.00,
        type: 'one-time',
        creatorName: 'FitLife Academy'
    },
    {
        id: 3,
        title: 'Digital Art Pack',
        description: 'Over 500+ high resolution textures and brushes for Procreate. Perfect for illustrators and designers.',
        price: 25.00,
        type: 'one-time',
        creatorName: 'CreativeStudio'
    },
    {
        id: 4,
        title: 'SaaS Founder Community',
        description: 'Join exclusive community of 100+ booted founders. Share insights, get feedback, and network.',
        price: 99.00,
        type: 'subscription',
        creatorName: 'SaaS Hub'
    },
    {
        id: 5,
        title: 'Ultimate Python Course',
        description: 'Zero to Hero in Python with 50+ hours of video content. Includes assignments, quizzes, and certificates.',
        price: 14.99,
        type: 'one-time',
        creatorName: 'CodeWithMe'
    }
];

// Mock Access Database
// Typically this would be checked on backend
const MOCK_ACCESS_DB = {
    // userId: [productIds]
    1: [1, 3], // Test User has access to 'Premium Trading Signals' and 'Digital Art Pack'
};

export const fetchProducts = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: MOCK_PRODUCTS
            });
        }, 800);
    });
};

export const fetchProductById = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = MOCK_PRODUCTS.find(p => p.id === parseInt(id));
            if (product) {
                resolve({ data: product });
            } else {
                reject(new Error("Product not found"));
            }
        }, 600);
    });
};

export const checkAccess = async (productId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const userStr = localStorage.getItem('user');
            if (!userStr) {
                resolve(false);
                return;
            }
            const user = JSON.parse(userStr);
            const userAccess = MOCK_ACCESS_DB[user.id] || [];
            resolve(userAccess.includes(parseInt(productId)));
        }, 400);
    });
};

export default api;
