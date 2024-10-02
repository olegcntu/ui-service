import React from 'react';
import ReactStars from 'react-rating-stars-component';
import {Link, useLocation} from 'react-router-dom';
import API_ROUTES from "../api";
import login from "../pages/Login";

const ProductCard = ({product, grid}) => {
    const {_id, title, slug, description, price, brand, ratings, images} = product;
    let location = useLocation();

    const addToWishlist=(id,event)=>{
        console.log(id)
        event.preventDefault();
        const token = localStorage.getItem('token');
        const fetchProductToWishlist = async () => {
            try {
                const requestBody = {
                    productId: id,
                };
                console.log(requestBody)
                const response = await fetch(`${API_ROUTES.PRODUCT_SERVICE}/product/wishlist`, {
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

    const addToCompare=(id,event)=>{
        console.log(id)
        event.preventDefault();
        const token = localStorage.getItem('token');
        const fetchProductToWishlist = async () => {
            try {
                const requestBody = {
                    productId: id,
                };
                console.log(requestBody)
                const response = await fetch(`${API_ROUTES.PRODUCT_SERVICE}/product/compare`, {
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
    const addToCart=(id,event)=>{
        event.preventDefault();
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
        <>
            <div className={`${location.pathname === '/product' ? `gr-${grid}` : 'col-3'}`}>
                <Link to={`${_id}`} className="product-card position-relative">
                    <div className="wishlist-ico position-absolute">
                        <button className="border-0 bg-transparent" onClick={(event) => addToWishlist(_id,event)} >
                            <img src="/images/ico/wishlist.png" alt="wishlist"/>
                        </button>
                    </div>
                    <div className="product-image">
                        <img src={images[0]?.url || '/images/product/1.jpg'} alt="product image"/>
                    </div>
                    <div className="product-details">
                        <h6 className="brand">{brand}</h6>
                        <h5 className="product-title">{title}</h5>
                        <ReactStars
                            count={5}
                            size={24}
                            value={ratings[0]?.star || 0}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <p className={`description ${grid === 12 ? 'd-block' : 'd-none'}`}>{description}</p>
                        <p className="price">${price.toFixed(2)}</p>
                    </div>
                    <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                            <button onClick={(event) => addToCompare(_id,event)} className="border-0 bg-transparent">
                                <img src="/images/ico/compare.png" alt="compare"/>
                            </button>
                            <button className="border-0 bg-transparent">
                                <img src="/images/ico/view.png" alt="view"/>
                            </button>
                            <button onClick={(event) => addToCart(_id,event)} className="border-0 bg-transparent">
                                <img src="/images/ico/addcard.png" alt="addcard"/>
                            </button>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default ProductCard;
