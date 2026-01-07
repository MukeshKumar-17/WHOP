import React from 'react';
import { Link } from 'react-router-dom';

const PaymentCancel = () => {
    return (
        <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
            <div style={{ background: 'white', padding: '40px', borderRadius: '12px', display: 'inline-block', border: '1px solid #eee' }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px', color: '#d63031' }}>✕</div>
                <h1 style={{ marginBottom: '10px' }}>Payment Cancelled</h1>
                <p style={{ color: '#666', marginBottom: '30px' }}>You have not been charged. The checkout process was cancelled.</p>

                <Link to="/products" className="btn">Return to Marketplace</Link>
            </div>
        </div>
    );
};

export default PaymentCancel;
