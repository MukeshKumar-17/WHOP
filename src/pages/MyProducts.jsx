import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchCreatorProducts, deleteProduct } from '../services/api';

const MyProducts = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null); // ID of product being acted on

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const res = await fetchCreatorProducts();
            setProducts(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
            return;
        }

        setActionLoading(productId);
        try {
            await deleteProduct(productId);
            // Remove from UI
            setProducts(products.filter(p => p.id !== productId));
        } catch (error) {
            alert("Failed to delete product");
        } finally {
            setActionLoading(null);
        }
    };

    if (user?.role !== 'creator') {
        return (
            <div className="container" style={{ marginTop: '50px' }}>
                <div className="error-state">
                    <h2>Access Denied</h2>
                    <p>Only verified creators can access this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ marginBottom: '5px' }}>My Products</h2>
                    <p style={{ color: '#666' }}>Manage your digital products and subscriptions.</p>
                </div>
                <Link to="/creator/create-product" className="btn" style={{ background: '#2ecc71' }}>+ New Product</Link>
            </div>

            {loading ? (
                <div className="loading-state">Loading your products...</div>
            ) : products.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '8px' }}>
                    <p>You haven't created any products yet.</p>
                    <Link to="/creator/create-product" style={{ color: '#6C5CE7', fontWeight: 'bold' }}>Create your first product</Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {products.map(product => (
                        <div key={product.id} style={{
                            background: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '15px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: '#f0f0f0',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    color: '#ccc'
                                }}>
                                    {product.title.charAt(0)}
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 5px 0' }}>{product.title}</h4>
                                    <span style={{
                                        fontSize: '0.8rem',
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        background: product.type === 'subscription' ? '#eef2ff' : '#e6fffa',
                                        color: product.type === 'subscription' ? '#4f46e5' : '#00b894'
                                    }}>
                                        {product.type === 'subscription' ? 'Subscription' : 'One-Time'}
                                    </span>
                                    <span style={{ marginLeft: '10px', fontSize: '0.9rem', fontWeight: 'bold' }}>${product.price}</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <Link to={`/products/${product.id}`} className="btn" style={{ background: 'white', color: '#333', border: '1px solid #ddd', padding: '8px 15px' }}>View</Link>
                                <button disabled className="btn" style={{ background: '#f0f0f0', color: '#aaa', cursor: 'not-allowed', padding: '8px 15px' }} title="Coming soon">Edit</button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="btn"
                                    style={{ background: '#fff0f0', color: '#d63031', border: '1px solid #ffcccc', padding: '8px 15px' }}
                                    disabled={actionLoading === product.id}
                                >
                                    {actionLoading === product.id ? '...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyProducts;
