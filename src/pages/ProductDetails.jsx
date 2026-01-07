import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById, checkAccess, createCheckoutSession } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [product, setProduct] = useState(null);
    const [hasAccess, setHasAccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        const loadProductData = async () => {
            try {
                setLoading(true);
                // Parallel fetching
                const [productRes, accessRes] = await Promise.all([
                    fetchProductById(id),
                    user ? checkAccess(id) : Promise.resolve(false)
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

    const handleBuyNow = async () => {
        if (!user) return;
        setPurchasing(true);
        try {
            const res = await createCheckoutSession(product.id);
            if (res.data.url) {
                window.location.href = res.data.url;
            } else {
                alert('Checkout URL not found');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to initiate checkout. Please try again.');
        } finally {
            setPurchasing(false);
        }
    };

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
                        Created by <strong>{product.creatorName || 'Unknown Creator'}</strong>
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
                            <button
                                className="btn"
                                onClick={handleBuyNow}
                                disabled={purchasing}
                                style={{ opacity: purchasing ? 0.7 : 1 }}
                            >
                                {purchasing ? 'Redirecting...' : 'Buy Now'}
                            </button>
                        )}
                    </div>

                    <div className="description-section">
                        <h3>About this product</h3>
                        <p style={{ lineHeight: '1.6', fontSize: '1.1rem', color: '#444' }}>
                            {product.description}
                        </p>
                    </div>

                    {/* Technical Info */}
                    <div style={{ marginTop: '40px', padding: '20px', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.9rem', color: '#666' }}>
                        <p><strong>Secure Checkout:</strong> Payments are processed securely via Stripe. You will be redirected to complete your purchase.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
