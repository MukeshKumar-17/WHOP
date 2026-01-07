import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/common/ProductCard';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetchProducts();
                setProducts(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    return (
        <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2>Discover Top Digital Products</h2>
                <p style={{ color: '#666', maxWidth: '600px', margin: '10px auto' }}>
                    Browse through communities, courses, and software from top creators.
                </p>
            </div>

            {loading && (
                <div className="loading-state">
                    <p>Loading products...</p>
                </div>
            )}

            {error && (
                <div className="error-state">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && (
                <div className="products-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
