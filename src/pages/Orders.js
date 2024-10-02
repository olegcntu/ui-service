import React, {useEffect, useState} from 'react'
import BreadCrumb from "../components/BreadCrumb";
import {Helmet} from "react-helmet";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import API_ROUTES from "../api";
import RandomProduct from "../components/RandomProduct";
import CartComponent from "../components/CartComponent";
import {Link} from "react-router-dom";
import OrderComponent from "../components/OrderComponent";
import {useNavigate} from "react-router-dom";

const Orders = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const fetchProduct = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        try {
            const response = await fetch(`${API_ROUTES.USER_SERVICE}/user/get-orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchProduct();
    }, [products]);

    const deleteProduct = async (id,count) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        console.log()
        console.log()
        try {
            const requestBody = {
                prodId: id,
                count: count,
            }
            const response = await fetch(`${API_ROUTES.PRODUCT_SERVICE}/product/order`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody)
            });
        } catch (error) {
            console.log(error);
        }
        fetchProduct()
    };
    return (
        <>
            <Meta title={"Order"}/>
            <BreadCrumb title="Order"/>
            <Container class1="store-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                            <h4 className="cart-col-1">Product</h4>
                            <h4 className="cart-col-2">Price</h4>
                            <h4 className="cart-col-3">Quantity</h4>
                            <h4 className="cart-col-4">Total</h4>
                            <h4 className="cart-col-5"> Data</h4>
                        </div>
                        {products.map((product) => (
                            <OrderComponent
                                deleteProduct={()=>deleteProduct(product._id,product.quantity)}
                                key={product.product._id}
                                id={product._id}
                                imageSrc={product.product.images[0].url}
                                title={product.product.title}
                                iaNew={product.product.isNew}
                                price={product.product.price}
                                count={product.quantity}
                                firstname={product.firstname}
                                lastname={product.lastname}
                                address={product.address}
                                city={product.city}
                                mobile={product.mobile}
                            />
                        ))}

                    </div>
                </div>
            </Container>
        </>
    )
}
export default Orders
