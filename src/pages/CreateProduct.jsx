import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createProduct } from '../services/api';

const CreateProduct = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        type: 'one-time'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Access Control
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!formData.title || !formData.description || !formData.price) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }

        if (parseFloat(formData.price) <= 0) {
            setError('Price must be greater than 0.');
            setLoading(false);
            return;
        }

        try {
            await createProduct(formData);
            setSuccess('Product created successfully! Redirecting...');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            console.error(err);
            setError('Failed to create product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div style={{ maxWidth: '600px', margin: '40px auto', background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <h2 style={{ marginBottom: '20px' }}>Create New Product</h2>

                {error && <div style={{ background: '#ffe6e6', color: '#d63031', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>{error}</div>}
                {success && <div style={{ background: '#e6fffa', color: '#00b894', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Product Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Masterclass 2024"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
                            placeholder="Describe your product..."
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label>Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                min="0.01"
                                step="0.01"
                                placeholder="0.00"
                            />
                        </div>

                        <div className="form-group">
                            <label>Type</label>
                            <select name="type" value={formData.type} onChange={handleChange}>
                                <option value="one-time">One-Time Purchase</option>
                                <option value="subscription">Monthly Subscription</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn" disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
                        {loading ? 'Creating...' : 'Create Product'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
