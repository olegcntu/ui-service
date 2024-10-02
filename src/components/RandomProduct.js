import React from 'react';
import ReactStars from 'react-rating-stars-component';

const RandomProduct = ({ imageSrc, title, rating, price }) => {
    return (
        <div className="random-products mb-3 d-flex">
            <div className="w-50">
                <img src={imageSrc} className="img-fluid" alt="Product" />
            </div>
            <div className="w-50">
                <h5>{title}</h5>
                <ReactStars count={5} size={24} value={rating} edit={false} activeColor="#ffd700" />
                <b>${price}</b>
            </div>
        </div>
    );
};

export default RandomProduct;
