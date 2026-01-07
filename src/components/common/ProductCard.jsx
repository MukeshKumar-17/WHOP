import React from 'react';

const ProductCard = ({ product }) => {
    const isSubscription = product.type === 'subscription';

    return (
        <div className="product-card">
            <div className="product-header">
                {/* Placeholder for Product Image */}
                <div className="product-image-placeholder">
                    {product.title.charAt(0)}
                </div>
                <span className={`product-badge ${isSubscription ? 'badge-sub' : 'badge-onetime'}`}>
                    {isSubscription ? 'Monthly' : 'One-Time'}
                </span>
            </div>

            <div className="product-body">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-creator">by {product.creatorName}</p>
                <p className="product-desc">{product.description}</p>
            </div>

            <div className="product-footer">
                <div className="product-price">
                    ${product.price.toFixed(2)}
                    {isSubscription && <span className="period">/mo</span>}
                </div>
                <button className="btn btn-block">View Details</button>
            </div>
        </div>
    );
};

export default ProductCard;
