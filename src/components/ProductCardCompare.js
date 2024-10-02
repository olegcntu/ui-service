import React from 'react';
import cross from "../images/ico/cross.png"
import ReactStars from "react-rating-stars-component";
import API_ROUTES from "../api";

const ProductCardCompare = ({ addToWishlist, imageSrc, title, price, brand, type, totalrating }) => {

    return (
        <div className="col-3">
            <div className="compare-product-card position-relative">
                <img onClick={() => addToWishlist()}
                     src={cross} alt="cross" className="position-absolute cross img-fluid" />
                <div className="product-card-image">
                    <img src={imageSrc} alt="watch" />
                </div>
                <div className="compare-product-details">
                    <h5 className="title">{title}</h5>
                    <h6 className="price mb-3 mt-3">$ {price}</h6>
                    <div>
                        <div className="product-detail">
                            <h5>Brand:</h5>
                            <p>{brand}</p>
                        </div>
                        <div className="product-detail">
                            <h5>Type:</h5>
                            <p>{type? "New":"Used"}</p>
                        </div>
                        <div className="product-detail">
                            <h5>Rating:</h5>
                            <ReactStars
                                count={5}
                                size={24}
                                value={totalrating}
                                edit={false}
                                activeColor="#ffd700"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardCompare;
