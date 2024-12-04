import React from 'react';
import ReactStars from 'react-rating-stars-component';

const RandomProduct = ({ id, imageSrc, title, rating, price }) => {
    // Получение текущего URL
    const currentUrl = window.location.href;

    return (
        <div className="random-products mb-3 d-flex">
            <div className="w-50">
                {/* Добавляем ссылку вокруг изображения */}
                <a href={`${currentUrl}/${id}`}>
                    <img
                        src={imageSrc}
                        className="img-fluid"
                        alt="Product"
                        style={{ width: '110px', height: 'auto' }}
                    />
                </a>
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
