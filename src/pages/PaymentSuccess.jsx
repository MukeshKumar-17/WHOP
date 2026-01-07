import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    return (
        <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
            <div style={{ background: 'white', padding: '40px', borderRadius: '12px', display: 'inline-block', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
                <h1 style={{ marginBottom: '10px', color: '#00b894' }}>Payment Successful!</h1>
                <p style={{ color: '#666', marginBottom: '30px' }}>Thank you for your purchase. Access has been granted to your account.</p>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <Link to="/dashboard" className="btn" style={{ background: '#2d3436' }}>Go to Dashboard</Link>
                    <Link to="/products" className="btn" style={{ background: 'white', color: '#333', border: '1px solid #ddd' }}>Continue Shopping</Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
