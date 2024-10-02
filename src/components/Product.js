import React from 'react';
import ReactStars from 'react-rating-stars-component';

const Product = ({ imageSrc, title, rating, price }) => {
    return (
        <div className="random-products mb-3 d-flex">
            <div className="w-50">
                <img src={imageSrc} className="img-fluid" alt="watch" />
            </div>
            <div className="w-50">
                <h5>{title}</h5>
                <ReactStars
                    count={5}
                    size={24}
                    value={rating}
                    edit={false}
                    activeColor="#ffd700"
                />
                <b>${price}</b>
            </div>
        </div>
    );
};

const FilterCard = () => {
    return (
        <div className="filter-card mb-3">
            <h3 className="filter-title">Random product</h3>
            <div>
                <Product
                    imageSrc="/images/1.jpg"
                    title="Kids headphones bulk 10 pack multi colored for students"
                    rating={3}
                    price={100}
                />
                <Product
                    imageSrc="/images/1.jpg"
                    title="Kids headphones bulk 10 pack multi colored for students"
                    rating={3}
                    price={100}
                />
            </div>
        </div>
    );
};

export default FilterCard;
