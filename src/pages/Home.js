import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import {SpecialProduct} from "../components/SpecialProduct";
import Container from "../components/Container";
import {services} from "../utils/Data";
import Meta from "../components/Meta";
import API_ROUTES from "../api";
import CartComponent from "../components/CartComponent";

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [specialProd, setSpecialProd] = useState([]);
    const role = localStorage.getItem('role');
    useEffect(() => {
        fetch(`${API_ROUTES.BLOG_SERVICE}/blog/`)
            .then(response => response.json())
            .then(data => setBlogs(data))
            .catch(error => console.error('Error while executing request::', error));

        fetch(`${API_ROUTES.PRODUCT_SERVICE}/product/`)
            .then(response => response.json())
            .then(data => {
                if(data.length>3) {
                    const randomIndexes = [];
                    while (randomIndexes.length < 3) {
                        const randomIndex = Math.floor(Math.random() * data.length);
                        if (!randomIndexes.includes(randomIndex)) {
                            randomIndexes.push(randomIndex);
                        }
                    }
                    const randomProducts = randomIndexes.map(index => data[index]);
                    setSpecialProd(randomProducts);
                }
            })
            .catch(error => console.error('Error while executing request:', error));



    }, []);



    return (
        <>
            <Meta title="Home"/>
            <Container class1="home-wrapper-1 py-5">
                <div className="row">
                    <div className="col-6">
                        <div className="main-banner position-relative">
                            <img className="img-fluid rounded-3"
                                 src="/images/main-banner.jpg"
                                 alt="main banner"/>
                            <div className="main-banner-content position-absolute">
                                <h4>BEST SHOP FOR PROS.</h4>
                                <h5>Gaming phones</h5>
                                <p>From $999.0 or 41.62/mo.</p>
                                <Link to={'/product'} className="button">Go to shop</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
                            <div className="small-banner position-relative ">
                                <img className="img-fluid rounded-3"
                                     src="/images/catbanner-02.jpg"
                                     alt="main banner"/>
                                <div className="small-banner-content position-absolute">
                                    <h4>SUPERCHARGER FOR PROS.</h4>
                                    <h5>latest keyboards</h5>
                                    <p>From $19.0 <br/>or 1.58/mo.</p>
                                </div>
                            </div>
                            <div className="small-banner position-relative ">
                                <img className="img-fluid rounded-3"
                                     src="/images/computer-2982270_1920.jpg"
                                     alt="main banner"/>

                            </div>
                            <div className="small-banner position-relative ">
                                <img className="img-fluid rounded-3"
                                     src="/images/workspace-1280538_1920.jpg"
                                     alt="main banner"/>
                                <div className="small-banner-content position-absolute">
                                    <h4>for working at home</h4>
                                    <h5>buy stuff from us</h5>
                                    <p>From $9.0</p>
                                </div>
                            </div>
                            <div className="small-banner position-relative ">
                                <img className="img-fluid rounded-3"
                                     src="/images/desk-1284085_1920.jpg"
                                     alt="main banner"/>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="services d-flex align-items-center justify-content-between">
                            {services?.map((i, j) => {
                                return (
                                    <div className="d-flex align-items-center gap-15">
                                        <img src={i.image}/>
                                        <div>
                                            <h4>{i.title}</h4>
                                            <p className="mb-0">{i.tagLine}</p>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="categories d-flex justify-content-between flex-wrap align-items-center">
                            <div className="d-flex  align-items-center">
                                <div>
                                    <h5>System unit</h5>
                                    <p>24 Items</p>
                                </div>
                                <img className="img-fluid" src="/images/imgonline-com-ua-Resize-AIYDvK9Msp.png" alt="camera"></img>
                            </div>
                            <div className="d-flex  align-items-center">
                                <div>
                                    <h5>Monitors</h5>
                                    <p>10 Items</p>
                                </div>
                                <img className="img-fluid" src="/images/TV.jpg" alt="camera"></img>
                            </div>
                            <div className="d-flex  align-items-center">
                                <div>
                                    <h5>Computer mouse</h5>
                                    <p>15 Items</p>
                                </div>
                                <img className="img-fluid" src="/images/pngwing.com.png" alt="camera"></img>
                            </div>
                            <div className="d-flex  align-items-center">
                                <div>
                                    <h5>Headphones</h5>
                                    <p>9 Items</p>
                                </div>
                                <img className="img-fluid" src="/images/headphones.jpg" alt="camera"></img>
                            </div>

                            <div className="d-flex  align-items-center">
                                <div>
                                    <h5>USB cord</h5>
                                    <p>7 Items</p>
                                </div>
                                <img className="img-fluid" src="/images/cabel.png" alt="camera"></img>
                            </div>
                            <div className="d-flex  align-items-center">
                                <div>
                                    <h5>Keyboard</h5>
                                    <p>10 Items</p>
                                </div>
                                <img className="img-fluid" src="/images/keyboard.png" alt="camera"></img>
                            </div>
                            <div className="d-flex  align-items-center">
                                <div>
                                    <h5>Laptop</h5>
                                    <p>39 Items</p>
                                </div>
                                <img className="img-fluid" src="/images/laptop.png" alt="camera"></img>
                            </div>
                            <div className="d-flex  align-items-center">
                                <div>
                                    <h5>Tablet</h5>
                                    <p>17 Items</p>
                                </div>
                                <img className="img-fluid" src="/images/tablet.png" alt="camera"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="featured-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Featured Collection</h3>
                    </div>
                    <div className="d-flex gap-10">
                        {/*<ProductCard/>*/}
                        {/*<ProductCard/>*/}
                        {/*<ProductCard/>*/}
                        {/*<ProductCard/>*/}
                    </div>
                </div>
            </Container>
            <Container class1="famous-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-3">
                        <div className="famous-card position-relative">
                            <img className="img-fluid" src="/images/2.jpg" alt="famous"></img>
                            <div className="famous-content position-absolute">
                                <h5>Big screen</h5>
                                <h6>Smart</h6>
                                <p>From $399</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="famous-card position-relative">
                            <img className="img-fluid" src="/images/1235.jpg" alt="famous"></img>
                            <div className="famous-content position-absolute">
                                <h5 className="text-dark">Studio Display</h5>
                                <h6 className="text-dark">600</h6>
                                <p className="text-dark"> 27-inch 5k Retina display</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="famous-card position-relative">
                            <img className="img-fluid" src="/images/3.jpg" alt="famous"></img>
                            <div className="famous-content position-absolute">
                                <h5 className="text-dark">Tablet</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-3">
                        <div className="famous-card position-relative">
                            <img className="img-fluid" src="/images/1236.jpg" alt="famous"></img>
                            <div className="famous-content position-absolute">
                                <h5 className="text-dark">Excellent Sound</h5>
                                <h6 className="text-dark">399$</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="special-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Special Products</h3>
                    </div>
                </div>
                <div className="row">
                    {specialProd.map((product) => {
                        const randomDiscountDays = Math.floor(Math.random() * 5) + 1;
                        const randomProgressValue = Math.floor(Math.random() * 100) + 1;

                        return (
                            <SpecialProduct
                                id={product._id}
                                imageSrc={product.images[0].url}
                                brand={product.brand}
                                title={product.title}
                                rating={5}
                                price={product.price}
                                discountDays={randomDiscountDays}
                                productCount={product.quantity}
                                progressValue={randomProgressValue}
                            />
                        );
                    })}

                </div>
            </Container>
            <Container class1="popular-wrapper py-5 home-wrapper-2">
                {/*<div className="row">*/}
                {/*    <div className="col-12">*/}
                {/*        <h3 className="section-heading">Our Popular Products</h3>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="row">*/}
                {/*    <div className="d-flex gap-10">*/}
                {/*        /!*<ProductCard/>*!/*/}
                {/*        /!*<ProductCard/>*!/*/}
                {/*        /!*<ProductCard/>*!/*/}
                {/*        /!*<ProductCard/>*!/*/}
                {/*    </div>*/}
                {/*</div>*/}
            </Container>
            <Container class1="marque-wrapper py-5 ">
                <div className="row">
                    <div className="col-12">
                        <div className="marquee-inner-wrapper card-wrapper">
                            <Marquee className="d-flex">
                                <div className="mx-4 w-25">
                                    <img src="/images/brand/samsung.png" alt="brand"/>
                                </div>
                                <div className="mx-4 w-25">
                                    <img src="/images/brand/dell.png" alt="brand"/>
                                </div>
                                <div className="mx-4 w-25">
                                    <img src="/images/brand/intel.png" alt="brand"/>
                                </div>
                                <div className="mx-4 w-25">
                                    <img src="/images/brand/LG.png" alt="brand"/>
                                </div>
                                <div className="mx-4 w-25">
                                    <img src="/images/brand/asus.png" alt="brand"/>
                                </div>
                                <div className="mx-4 w-25">
                                    <img src="/images/brand/apple.png" alt="brand"/>
                                </div>
                                <div className="mx-4 w-25">
                                    <img src="/images/brand/sony.png" alt="brand"/>
                                </div>
                            </Marquee>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="blog-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Our Letest Blogs</h3>
                    </div>
                </div>
                <div className="row">
                    {blogs.map(blog => (
                        <div className="col-3" key={blog._id}>
                            <BlogCard
                                id={blog._id}
                                title={blog.title}
                                description={blog.description}
                                createdAt={blog.createdAt}
                                images={blog.images}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </>
    )
}

export default Home
