import React, {useEffect, useState} from 'react'
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Color from "../components/Color";
import cross from "../images/ico/cross.png"
import Container from "../components/Container";
import ProductCardCompare from "../components/ProductCardCompare";
import API_ROUTES from "../api";
import BlogCard from "../components/BlogCard";
import {useNavigate} from "react-router-dom";

const CompareProduct = () => {
    const [products, setProducts] = useState([]);
    const [updateWishlist, setUpdateWishlist] =useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_ROUTES.USER_SERVICE}/user/compare`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setProducts(data.compare);

            } catch (error) {

            }
        };
        fetchProducts().then(setUpdateWishlist(true))

    }, [updateWishlist]);
    const addToWishlist=(id)=>{
        const token = localStorage.getItem('token');
        const fetchProducts = async () => {
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
        fetchProducts().then(setUpdateWishlist(false))
    }
    return (
        <>
            <Meta title={"Compare Products"}/>
            <BreadCrumb title="Compare Products"/>
            <Container class1="compare-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    {products.length > 0 ? (
                        products.map(product => (
                            <ProductCardCompare
                                key={product._id}
                                id={product._id}
                                imageSrc={product.images[0].url}
                                title={product.title}
                                price={product.price}
                                brand={product.brand}
                                type={product.isNew}
                                totalrating={product.totalrating}
                                addToWishlist={() => addToWishlist(product._id)}
                            />
                        ))
                    ) : (
                        <div className="no-products">
                            <p>No product to compare</p>
                        </div>
                    )}
                </div>
            </Container>
        </>
    )
}
export default CompareProduct
