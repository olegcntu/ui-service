import React, {useEffect, useState} from 'react'
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import {Link, useParams} from "react-router-dom";
import {TbGitCompare} from "react-icons/tb"
import {AiOutlineHeart} from "react-icons/ai"
import Container from "../components/Container";
import API_ROUTES from "../api";
import {useNavigate} from "react-router-dom";

function SingleProduct() {

    const [product, setProduct] = useState(null);
    const [orderedProduct, setOrderedProduct] = useState(true)
    const {id} = useParams();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState(1);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`${API_ROUTES.PRODUCT_SERVICE}/product/${id}`);
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }
    const buyItNow = () => {
        addToCart();
        navigate('/cart');

    }

    const addToCart = () => {
        const token = localStorage.getItem('token');
        const fetchProductToWishlist = async () => {
            try {
                const requestBody = {
                    productId: id,
                    quantity: inputValue
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
    const addToWishlist = (event) => {
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
    const addToCompare = (event) => {
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

    const {
        _id,
        title,
        description,
        price,
        category,
        brand,
        quantity,
        sold,
        images,
        ratings,
        createdAt,
        totalrating,
        isNew,
        updatedAt
    } = product;

    const props = {
        width: 600,
        height: 500,
        zoomWidth: 500,
        img: images[0].url
    }
    return (
        <>
            <Meta title={title}/>
            <BreadCrumb title={title}/>
            <Container class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                                <img className="img-fluid" src={ images[0].url} alt=""/>
                            </div>
                        </div>
                        {/*<ReactImageZoom{...props}/>*/}
                        {/*<img className="img-fluid" src={ images[0].url} alt=""/>*/}
                        <div className="other-product-images d-flex flex-wrap gap-15">
                            {images.map((image, index) => (
                                <div key={index}>
                                    <img className="img-fluid" src={image.url} alt=""/>
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className="border-bottom">
                                <h3 className="title">{title}</h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className="price">{`$ ${price}`}</p>
                                <div className="d-flex align-items-center gap-10">
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={totalrating}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                    <p className="mb-0">({sold} rewiews)</p>
                                </div>
                                <a className="review-btn" href="#reviews">Write a Reviews</a>
                            </div>
                            <div className="border-bottom py-3">

                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Condition :</h3>
                                    {isNew ? <p className="product-data">New Goods</p> :
                                        <p className="product-data">Used Goods</p>}

                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Brand :</h3>
                                    <p className="product-data">{brand}</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Category :</h3>
                                    <p className="product-data">{category}</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Tags :</h3>
                                    <p className="product-data">Watch</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="product-heading">Availability :</h3>
                                    <p className="product-data">In Stock</p>
                                </div>
                                <div className="d-flex gap-10 flex-column mt-2 mb-3">

                                </div>

                                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                                    <h3 className="product-heading">Quantity :</h3>
                                    <div className="">
                                        <input
                                            onChange={handleInputChange}
                                            className="form-control"
                                            style={{width: "70px"}}
                                            type="number"
                                            min={1}
                                            max={quantity}
                                            name=""
                                            defaultValue={quantity === 0 ? 0 : 1}
                                            id=""></input>
                                    </div>
                                </div>
                                {quantity !== 0 ? (
                                    <div>
                                        <div className="d-flex align-items-center gap-30 ms-0">
                                            <button className="button border-0" type="submit"
                                                    onClick={(event) => addToCart()}>
                                                Add to Card
                                            </button>
                                            <button onClick={(event) => buyItNow()} className="button signup">Buy It
                                                Now
                                            </button>
                                        </div>

                                        <div className="prod d-flex align-items-center gap-15">
                                            <div>
                                                <a onClick={addToCompare} href=""><TbGitCompare className="fs-5 me-2"/>Add
                                                    to Compare</a>
                                            </div>
                                            <div>
                                                <a onClick={addToWishlist} href=""><AiOutlineHeart
                                                    className="fs-5 me-2"/>Add to Wishlist</a>
                                            </div>

                                        </div>
                                    </div>
                                ) : (<div>no product in stock</div>)}
                                <div className="d-flex gap-10 align-items-center my-3">
                                    <h3 className="product-heading">Shipping & Returns :</h3>
                                    <p className="product-data">Free shipping and returns avalibal rge efs;wf </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="description-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h4>Description</h4>
                        <div className="bg-white p-3">
                            <p> {description}</p>
                        </div>
                    </div>
                </div>
            </Container>
            <Container id="reviews" class1="reviews-wrapper home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3>Reviews</h3>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div>
                                    <h4 className="mb-2">Customer Reviews</h4>
                                    <div className="d-flex align-items-center gap-10">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={totalrating}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <p className="mb-0 t-review">Based on {sold} Reviews</p>
                                    </div>
                                </div>
                                {
                                    orderedProduct && (<div>
                                        <a className="text-dark text-decoration-underline" href="">Write a Review</a>
                                    </div>)
                                }
                            </div>
                            <div className="review-form py-4">
                                <h4>
                                    <h4 className="mb-2">Write a reviews</h4>
                                </h4>
                                <form action="" className="d-flex flex-column gap-15">
                                    <div>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={3}
                                            edit={true}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                    <div>
                                            <textarea
                                                placeholder="comments"
                                                name="" id=""
                                                className="w-100 form-control"
                                                cols="30"
                                                rows="4">

                                            </textarea>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="button border-0">Submit Review</button>
                                    </div>
                                </form>
                            </div>
                            <div className="reviews">
                                <div className="review mt-4">
                                    <div className="d-flex gap-10 align-items-center">
                                        <h6 className="mb-0">Navdeep</h6>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={3}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                    <p className="mt-3"> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="popular-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Our Popular Products</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="d-flex gap-10">
                        {/*<ProductCard/>*/}
                        {/*<ProductCard/>*/}
                        {/*<ProductCard/>*/}
                        {/*<ProductCard/>*/}
                    </div>
                </div>
            </Container>
        </>
    )
}

export default SingleProduct
