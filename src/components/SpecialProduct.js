import React from 'react';
import ReactStars from 'react-rating-stars-component';
import {Link} from 'react-router-dom';
import API_ROUTES from "../api";

export const SpecialProduct = ({
                                   id,
                                   imageSrc,
                                   brand,
                                   title,
                                   rating,
                                   price,
                                   discountDays,
                                   productCount,
                                   progressValue,
                               }) => {
    const addToCart=()=>{
        const token = localStorage.getItem('token');
        const fetchProductToWishlist = async () => {
            try {
                const requestBody = {
                    productId: id,
                    quantity: 1
                };
                console.log(requestBody)
                const response = await fetch(`${API_ROUTES.PRODUCT_SERVICE}/product/cart`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(requestBody)
                });
            } catch (error) {

            }
        };
        fetchProductToWishlist().then()
    }
    return (
        <div className="col-6 mb-3">
            <div className="special-product-card">
                <div className="d-flex justify-content-between">
                    <div>
                        <img className="img-fluid" src={imageSrc} alt="product image"/>
                    </div>
                    <div className="special-product-content">
                        <h5 className="brand">{brand}</h5>
                        <h6 className="title">{title}</h6>
                        <ReactStars count={5} size={24} value={rating} edit={false} activeColor="#ffd700"/>
                        <p className="price">
                            <span className="red-p">${price}</span>&nbsp;
                            <strike>${price * 2}</strike>
                        </p>
                        <div className="discount-title d-flex align-items-center gap-10">
                            <p className="mb-0">
                                <b>{discountDays}</b> days
                            </p>
                            <div className="d-flex gap-10 align-items-center">
                                <span className="badge rounded-circle p-3 bg-danger">1</span>:
                                <span className="badge rounded-circle p-3 bg-danger">1</span>:
                                <span className="badge rounded-circle p-3 bg-danger">1</span>
                            </div>
                        </div>
                        <div className="prod-count my-3">
                            <p>Products: {productCount}</p>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{width: `${progressValue}%`}}
                                    aria-valuenow={progressValue}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                ></div>
                            </div>
                        </div>
                        <Link  onClick={(event) => addToCart() } className="button">Add to Card</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
