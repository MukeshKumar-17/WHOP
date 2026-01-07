import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById, checkAccess } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [product, setProduct] = useState(null);
    const [hasAccess, setHasAccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProductData = async () => {
            try {
                setLoading(true);
                // Parallel fetching
                const [productRes, accessRes] = await Promise.all([
                    fetchProductById(id),
                    checkAccess(id)
                ]);

                setProduct(productRes.data);
                setHasAccess(accessRes);
            } catch (err) {
                console.error(err);
                setError('Failed to load product details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadProductData();
        }
    }, [id, user]); // Re-run if user changes (login/logout)

    if (loading) return <div className="loading-state">Loading product details...</div>;
    if (error) return <div className="error-state">{error} <br /> <Link to="/products">Back to marketplace</Link></div>;
    if (!product) return <div className="error-state">Product not found</div>;

    const isSubscription = product.type === 'subscription';

    return (
        <div className="container" style={{ marginTop: '40px' }}>
            <Link to="/products" style={{ display: 'inline-block', marginBottom: '20px', textDecoration: 'none', color: '#666' }}>
                &larr; Back to Products
            </Link>

            <div className="product-details-layout">
                <div className="details-header" style={{ marginBottom: '30px' }}>
                    <div className="product-image-placeholder large" style={{ height: '200px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', fontWeight: 'bold', borderRadius: '12px', color: '#ddd' }}>
                        {product.title.charAt(0)}
                    </div>
                </div>

                <div className="details-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <span className={`product-badge ${isSubscription ? 'badge-sub' : 'badge-onetime'}`} style={{ position: 'relative', top: '0', right: '0', display: 'inline-block', marginBottom: '10px' }}>
                        {isSubscription ? 'Monthly Subscription' : 'One-Time Purchase'}
                    </span>

                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{product.title}</h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                        Created by <strong>{product.creatorName}</strong>
                    </p>

                    <div className="price-box" style={{ background: '#fafafa', padding: '20px', borderRadius: '8px', border: '1px solid #eee', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
                                ${product.price}
                            </span>
                            {isSubscription && <span style={{ color: '#666' }}> / month</span>}
                        </div>

                        {/* Access Logic Buttons */}
                        {!user ? (
                            <Link to="/login" className="btn">Login to Purchase</Link>
                        ) : hasAccess ? (
                            <button className="btn" style={{ backgroundColor: '#00b894', cursor: 'default' }}>
                                Access Granted &#10003;
                            </button>
                        ) : (
                            <button className="btn" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} title="Backend integration required">
                                Buy Now
                            </button>
                        )}
                    </div>

                    <div className="description-section">
                        <h3>About this product</h3>
                        <p style={{ lineHeight: '1.6', fontSize: '1.1rem', color: '#444' }}>
                            {product.description} <br /><br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>

                    {/* Mock Technical Info */}
                    <div style={{ marginTop: '40px', padding: '20px', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.9rem', color: '#666' }}>
                        <p><strong>Dev Note:</strong> The "Buy Now" button is currently disabled as it requires backend payment integration (Stripe/LemonSqueezy).</p>
                        <p><strong>Access Check:</strong> If you log in as <code>user@test.com</code>, you will see "Access Granted" for <em>Premium Trading Signals</em> (ID: 1) and <em>Digital Art Pack</em> (ID: 3).</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
