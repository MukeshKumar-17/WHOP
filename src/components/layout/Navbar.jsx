import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link to="/" className="nav-logo">Whop Clone</Link>
                <div className="nav-links">
                    {user ? (
                        <>
                            <Link to="/products">Marketplace</Link>
                            <Link to="/dashboard">Dashboard</Link>
                            <span className="user-welcome">Hi, {user.name}</span>
                            <button onClick={handleLogout} className="btn-logout">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/products">Marketplace</Link>
                            <Link to="/login">Login</Link>
                            <Link to="/register" className="btn-nav">Get Started</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
