import React from 'react';
import ReactStars from 'react-rating-stars-component';
import {Link, useLocation} from 'react-router-dom';
import API_ROUTES from '../api';

const ProductCard = ({product, onDeleteProduct}) => {
    const {_id, title, slug, description, price, brand, ratings, images} = product;
    let location = useLocation();

    const handleDeleteProduct = async () => {
        onDeleteProduct(_id);
    };

    return (
        <>
        <div className={'gr-12'}>
            <div className="product-card position-relative">
                <div className="wishlist-ico position-absolute">
                    <button className="border-0 bg-transparent" onClick={handleDeleteProduct}>
                        <img src="/images/ico/delete.png" alt="delete"/>
                    </button>
                    <Link to={`/edit-product/${_id}`} className="border-10 bg-transparent">
                    <img src="/images/ico/edit.png" alt="edit"/>
                </Link>

            </div>
            <Link to={`/product/${_id}`} className="product-image">
                <img src={images[0]?.url || '/images/product/1.jpg'} alt="product image"/>
            </Link>
            <div className="product-details">
                <h6 className="brand">{brand}</h6>
                <h5 className="product-title">{title}</h5>
                <ReactStars count={5} size={24} value={ratings[0]?.star || 0} edit={false}
                            activeColor="#ffd700"/>
                <p className={'description d-block'}>{description}</p>
                <p className="price">${price.toFixed(2)}</p>
            </div>
        </div>
        </div>
</>
)
    ;
};

export default ProductCard;
