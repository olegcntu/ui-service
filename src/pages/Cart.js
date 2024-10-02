import React, {useEffect, useState} from 'react'
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import {AiFillDelete} from "react-icons/ai";
import {Link} from "react-router-dom";
import Container from "../components/Container";
import CartComponent from "../components/CartComponent";
import API_ROUTES from "../api";
import {services} from "../utils/Data";
import ProductUser from "../components/ProductUser";

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [deleteProd, setDeleteProd] = useState(false);
    const [subTotal, setSubTotal] = useState(0);

    const fetchProduct = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_ROUTES.USER_SERVICE}/user/cart`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setProducts(data.cart);
            calculateSubTotal(data.cart);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProduct();
        setDeleteProd(false);
    }, [deleteProd]);

    const calculateSubTotal = (data) => {
        let totalPrice = 0;
        data.forEach((item) => {
            const { product, quantity } = item;
            const { price } = product;
            const itemTotal = price * quantity;
            totalPrice += itemTotal;
        });
        setSubTotal(totalPrice);
    };


    const addToCart = (id) => {
        const token = localStorage.getItem('token');
        const fetchProductToCart = async () => {
            try {
                const requestBody = {
                    productId: id,
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
        fetchProductToCart().then(setDeleteProd(true))
    }



    return (
        <>
            <Meta title={"Cart"}/>
            <BreadCrumb title="Cart"/>
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                            <h4 className="cart-col-1">Product</h4>
                            <h4 className="cart-col-2">Price</h4>
                            <h4 className="cart-col-3">Quantity</h4>
                            <h4 className="cart-col-4">Total</h4>
                        </div>
                        {products.map((product) => (
                            <CartComponent
                                addToCart={(id) => {
                                    addToCart(id)
                                }}
                                key={product.product._id}
                                id={product.product._id}
                                imageSrc={product.product.images[0].url}
                                title={product.product.title}
                                iaNew={product.product.isNew}
                                count={product.quantity}
                                price={product.product.price}
                            />
                        ))}
                        <div className="col-12 py-2 mt-4">
                            <div className="d-flex justify-content-between align-items-baseline">
                                <Link to="/product" className="button">Continue To Shopping</Link>
                                <div className="d-flex flex-column align-items-end">
                                    <h4>SubTotal: $ {subTotal}</h4>
                                    <p>Taxes and shipping calculated at checkout</p>
                                    <Link to="/checkout" className="button">Checkout</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
export default Cart
