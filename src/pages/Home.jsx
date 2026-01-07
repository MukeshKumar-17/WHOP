import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <h1>Whop Clone Frontend Running</h1>
            <p>Welcome to the platform.</p>
            <div style={{ marginTop: '20px' }}>
                <Link to="/products" className="btn">Browse Products</Link>
                <span style={{ margin: '0 10px' }}>or</span>
                <Link to="/login" className="btn">Login</Link>
            </div>
        </div>
    );
};

export default Home;
