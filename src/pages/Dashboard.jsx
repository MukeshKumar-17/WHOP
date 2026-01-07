import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="container">
            <h2>Creator/User Dashboard</h2>
            <div className="dashboard-content">
                <p>Welcome back, <strong>{user?.name}</strong>!</p>
                <p>This is a protected area.</p>
                <button onClick={logout} className="btn" style={{ marginTop: '20px' }}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;
