import React from 'react';
import {AiFillDelete} from 'react-icons/ai';
import API_ROUTES from "../api";

const CartComponent = ({id, imageSrc, title, iaNew, count, price, addToCart}) => {

    return (
        <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
            <div className="cart-col-1 gap-15 d-flex align-items-center">
                <div className="w-25">
                    <img src={imageSrc} className="img-fluid" alt=""/>
                </div>
                <div className="w-75">
                    <p>{title}</p>
                    <p>Condition: {iaNew ? 'New Goods' : "Used Goods"}</p>
                </div>
            </div>
            <div className="cart-col-2">
                <h5 className="price">${price}</h5>
            </div>
            <div className="cart-col-3 d-flex align-items-center gap-15">
                <div>
                    <input
                        defaultValue={count}
                        min={count}
                        max={count}
                        className="form-control"
                        type="number"
                        name=""
                        id=""
                    />
                </div>
                <div>
                    <AiFillDelete onClick={(event) => addToCart(id)} className="text-danger"/>
                </div>
            </div>
            <div className="cart-col-4">
                <h5 className="price">${price * count}</h5>
            </div>
        </div>
    );
};

export default CartComponent;
