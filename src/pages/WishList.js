import React, {useEffect, useState} from 'react'
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import cross from "../images/ico/cross.png"
import Container from "../components/Container";
import API_ROUTES from "../api";
import ProductCardCompare from "../components/ProductCardCompare";
import {useNavigate} from "react-router-dom";

const WishList = () => {
    const [updateWishlist, setUpdateWishlist] =useState(true);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_ROUTES.USER_SERVICE}/user/wishlist`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setProducts(data.wishlist);

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
        fetchProducts().then(setUpdateWishlist(false))
    }
    return (
        <>
            <Meta title={"WishList"}/>
            <BreadCrumb title="WishList"/>
            <Container class1="wishlist-wrapper home-wrapper-2 py-5">
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
                            <p>No product in wishlist</p>
                        </div>
                    )}
                </div>
            </Container>
        </>
    )
}
export default WishList
