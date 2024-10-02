import React, {useEffect, useState} from 'react';
import {Form, Button, Container, ListGroup, Alert} from 'react-bootstrap';
import API_ROUTES from "../api";
import {CustomInput} from "../components/CustomInput";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import {Link, useParams} from "react-router-dom";

const EditProduct = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [images, setImages] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const token = localStorage.getItem('token');
    const {id} = useParams();

    useEffect(() => {
        fetch(`${API_ROUTES.PRODUCT_SERVICE}/product/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setTitle(data.title)
                setCategory(data.category)
                setBrand(data.brand)
                setDescription(data.description)
                setPrice(data.price)
                setQuantity(data.quantity)
                setImages(data.images)
            })
            .catch((error) => console.log(error));
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();

        const productData = {
            title: title,
            category: category,
            brand: brand,
            description: description,
            price: parseFloat(price),
            quantity: parseInt(quantity),
        };
        fetch(`${API_ROUTES.PRODUCT_SERVICE}/product/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(productData)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('product update created:', data);
            })
            .catch((error) => {
                console.error('Error while updating product:', error);
            });
    };

    const handleImageRemove = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    return (
        <>
            <Meta title="Edit Product"/>
            <BreadCrumb title="Edit Product"/>
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card" style={{width: "1300px"}}>
                            <h3 className="text-center mb-3">Update</h3>
                            <form onSubmit={handleSubmit} className="d-flex flex-column gap-30">
                                <CustomInput
                                    className="w-100"
                                    type="title"
                                    name="title"
                                    placeholder={title}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <CustomInput
                                    className="w-100"
                                    type="category"
                                    name="category"
                                    placeholder={category}
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                                <CustomInput
                                    className="w-100"
                                    type="brand"
                                    name="brand"
                                    placeholder={brand}
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                                <CustomInput
                                    className="w-100"
                                    type="description"
                                    name="description"
                                    placeholder={description}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <CustomInput
                                    className="w-100"
                                    type="price"
                                    name="price"
                                    placeholder={price}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <CustomInput
                                    className="w-100"
                                    type="quantity"
                                    name="quantity"
                                    placeholder={quantity}
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                                {images.length > 0 && (
                                    <ListGroup className="mt-4">
                                        <div className="d-flex flex-wrap">
                                            {images.map((image, index) => (
                                                <div key={index} className="m-2">
                                                    <img
                                                        src={image?.url}
                                                        alt={`Image ${index}`}
                                                        className="img-thumbnail"
                                                        style={{width: '200px', height: '200px', objectFit: 'contain'}}
                                                    />
                                                    <Button variant="danger" size="sm" className="mt-2"
                                                            onClick={() => handleImageRemove(index)}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </ListGroup>
                                )}
                                <div>
                                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                        <button className="button border-0" type="submit">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>

    );
};

export default EditProduct;
