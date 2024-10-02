import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import API_ROUTES from '../api';
import ProductUser from '../components/ProductUser';
import { Link } from 'react-router-dom';

const Account = () => {
    const [grid, setGrid] = useState(4);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_ROUTES.PRODUCT_SERVICE}/product/product-for-user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_ROUTES.PRODUCT_SERVICE}/product/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
            } else {
                console.log('Error when uninstalling a product');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Meta title={'Account'} />
            <BreadCrumb title="Account" />
            <Container class1="store-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-2">
                        <div className="filter-card mb-3">
                            <h3 className="filter-title-create">Add product</h3>
                            <Link to="/create-product">
                                <div className="create-product-button">
                                    <span className="plus-sign">+</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="products-list pb-5">
                            <div className="d-flex gap-10 flex-wrap">
                                {console.log(products)}
                                {products.map((product) => (
                                    <ProductUser key={product._id} product={product} onDeleteProduct={handleDeleteProduct} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Account;
