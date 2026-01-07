import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const isCreator = user?.role === 'creator';

    return (
        <div className="container dashboard-content">
            <div style={{ paddingBottom: '20px', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
                <h2 style={{ marginBottom: '10px' }}>{isCreator ? 'Creator Dashboard' : 'User Dashboard'}</h2>
                <p style={{ color: '#666' }}>Welcome back, <strong>{user?.name}</strong></p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                {isCreator ? (
                    <>
                        <div className="card-placeholder" style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                            <h3>Sales Overview</h3>
                            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>$1,240.00</p>
                            <p style={{ color: '#666' }}>Total revenue this month</p>
                        </div>
                        <div className="card-placeholder" style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                            <h3>Active Products</h3>
                            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>5</p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <Link to="/products" className="btn" style={{ fontSize: '0.9rem', flex: 1, textAlign: 'center' }}>Manage</Link>
                                <Link to="/creator/create-product" className="btn" style={{ fontSize: '0.9rem', background: '#2ecc71', flex: 1, textAlign: 'center' }}>+ New Product</Link>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="card-placeholder" style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                            <h3>My Memberships</h3>
                            <p>You have access to <strong>3</strong> communities.</p>
                            <ul style={{ textAlign: 'left', marginTop: '15px' }}>
                                <li>Premium Trading Group</li>
                                <li>Fitness Masterclass</li>
                                <li>Design Resources</li>
                            </ul>
                        </div>
                        <div className="card-placeholder" style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                            <h3>Recent Activity</h3>
                            <p>No recent purchases.</p>
                            <Link to="/products" className="btn" style={{ marginTop: '10px', fontSize: '0.9rem' }}>Browse Marketplace</Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
