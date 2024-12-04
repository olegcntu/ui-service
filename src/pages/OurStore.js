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

const OurStore = () => {
    const [grid, setGrid] = useState(4)
    const [products, setProducts] = useState([]);
    const [randomProducts, setRandomProducts] = useState([]);
    const [priceFrom, setPriceFrom] = useState('');
    const [randomProductTitle, setRandomProductTitle] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [isNew, setIsNew] = useState(true);
    const [isNotNew, setIsNotNew] = useState(true);
    const [count, setCount] = useState(0);
    const [category, setCategory] = useState('');

    const handleNewGoodsChange = () => {
        if (isNew) {
            setIsNew(false)
            setIsNotNew(true);
        } else {
            setIsNew(true);
        }
    };

    const Sort = (event) => {

        const selectedValue = event.target.value;
        if (selectedValue === 'price-ascend') {
            const sortedProducts = [...products].sort((a, b) => b.price - a.price);
            setProducts(sortedProducts);
        }
        if (selectedValue === 'name-ascend') {
            const sortedProducts = [...products].sort((a, b) => {
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();

                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }
                return 0;
            });

            setProducts(sortedProducts);
        }
    };


    const handleUsedGoodsChange = () => {
        if (isNotNew) {
            setIsNotNew(false)
            setIsNew(true);
        } else {
            setIsNotNew(true);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = `${API_ROUTES.PRODUCT_SERVICE}/product/`
                if (priceFrom) {
                    url += `?price[gte]=${priceFrom}`;
                }
                if (priceTo) {
                    if (priceFrom) {
                        url += `&price[lte]=${priceTo}`
                    } else url += `?price[lte]=${priceTo}`
                }
                if (!isNew) {
                    if (priceTo || priceFrom) {
                        url += `&isNew=false`
                    } else {
                        url += `?isNew=false`
                    }
                }
                if (!isNotNew) {
                    if (priceTo || priceFrom) {
                        url += `&isNew=true`
                    } else {
                        url += `?isNew=true`
                    }
                }
                if (category !== '') {
                    if (!isNotNew || !isNew || priceTo || priceFrom) {
                        url += `&category=${category}`
                    } else {
                        url += `?category=${category}`
                    }
                }
                const response = await fetch(url);

                const data = await response.json();
                setProducts(data);
                setCount(data.length)



                const responseForAi = await fetch(`${API_ROUTES.PRODUCT_SERVICE}/product/`);
                const dataForAi = await responseForAi.json();
                let productsFetched = false;

                try {
                    const email = localStorage.getItem('userEmail');
                    console.log("Email: " + email);

                    if (!email) {
                        throw new Error('Email not found in localStorage');
                    }

                    const aiResponse = await fetch(`${API_ROUTES.AI_SERVICE}user-and-recommendation`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({email, category}),
                    });

                    const aiData = await aiResponse.json();
                    console.log("AI Response:", aiData);

                    if (aiData.reply && Array.isArray(aiData.reply)) {
                        const recommendedIds = aiData.reply;
                        console.log("Recommended IDs:", recommendedIds);

                        const selectedProducts = dataForAi.filter(product =>
                            recommendedIds.includes(product._id)
                        );
                        setRandomProducts(selectedProducts);

                        setRandomProductTitle("AI Product");
                        productsFetched = true;
                    } else {
                        throw new Error('Invalid AI response format');
                    }
                } catch (error) {
                    console.error('Error fetching AI recommendations:', error);
                }

                if (!productsFetched) {
                    console.log("Falling back to random products");
                    if (data.length > 1) {
                        const randomIndexes = [];

                        while (randomIndexes.length < 2) {
                            const randomIndex = Math.floor(Math.random() * data.length);
                            if (!randomIndexes.includes(randomIndex)) {
                                randomIndexes.push(randomIndex);
                            }
                        }

                        const selectedProducts = randomIndexes.map(index => data[index]);
                        setRandomProducts(selectedProducts);

                        setRandomProductTitle("Random Products");
                    }
                }

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [priceFrom, priceTo, isNew, isNotNew, category]);


    return (
        <>
            <Meta title={"Our Store"}/>
            <BreadCrumb title="Our Store"/>
            <Container class1="store-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-3">
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">Shop by Categories</h3>
                            <div>
                                <ul className="ps-0">
                                    <li>Home</li>
                                    <li>Our store</li>
                                    <li>Blogs</li>
                                    <li>Contact</li>
                                </ul>
                            </div>
                        </div>
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">Filter By</h3>
                            <div>
                                <h5 className="sub-title">Category</h5>
                                <div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="newGoodsCheckbox"
                                            checked={category === "tablet"}
                                            onChange={() => {
                                                setCategory("tablet")
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="newGoodsCheckbox">
                                            Tablet
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="newGoodsCheckbox"
                                            checked={category === "headphones"}
                                            onChange={() => {
                                                setCategory("headphones")
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="newGoodsCheckbox">
                                            Headphones
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="newGoodsCheckbox"
                                            checked={category === "computerMouse"}
                                            onChange={() => {
                                                setCategory("computerMouse")
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="newGoodsCheckbox">
                                            Computer mouse
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="newGoodsCheckbox"
                                            checked={category === "systemUnit"}
                                            onChange={() => {
                                                setCategory("systemUnit")
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="newGoodsCheckbox">
                                            System unit
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="newGoodsCheckbox"
                                            checked={category === "ubsCord"}
                                            onChange={() => {
                                                setCategory("ubsCord")
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="newGoodsCheckbox">
                                            USB cord
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="newGoodsCheckbox"
                                            checked={category === "laptop"}
                                            onChange={() => {
                                                setCategory("laptop")
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="newGoodsCheckbox">
                                            Laptop
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="usedGoodsCheckbox"
                                            checked={category === "keyboard"}
                                            onChange={() => {
                                                setCategory("keyboard")
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="usedGoodsCheckbox">
                                            Keyboard
                                        </label>
                                    </div>
                                </div>
                                <h5 className="sub-title">Condition</h5>
                                <div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="newGoodsCheckbox"
                                            checked={isNew === true}
                                            onChange={handleNewGoodsChange}
                                        />
                                        <label className="form-check-label" htmlFor="newGoodsCheckbox">
                                            New Goods
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="usedGoodsCheckbox"
                                            checked={isNotNew === true}
                                            onChange={handleUsedGoodsChange}
                                        />
                                        <label className="form-check-label" htmlFor="usedGoodsCheckbox">
                                            Used Goods
                                        </label>
                                    </div>
                                </div>

                                <h5 className="sub-title">Price</h5>
                                <div className="d-flex align-items-center gap-10">
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="From"
                                            value={priceFrom}
                                            onChange={(e) => setPriceFrom(e.target.value)}
                                        />
                                        <label htmlFor="floatingInput">From</label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="floatingInput1"
                                            placeholder="To"
                                            value={priceTo}
                                            onChange={(e) => setPriceTo(e.target.value)}
                                        />
                                        <label htmlFor="floatingInput1">To</label>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">Product Tags</h3>
                            <div>
                                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                    Headphones
                                    </span>
                                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                    Laptop
                                    </span>
                                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                    Mobile
                                    </span>
                                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                    Wire
                                    </span>
                                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                    Computer
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">{randomProductTitle}</h3>
                            <div>
                                {randomProducts.map((product) => (
                                    <RandomProduct
                                        key={product.id}
                                        id={product._id}
                                        imageSrc={product.images[0].url}
                                        title={product.title}
                                        rating={product.rating}
                                        price={product.price}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="filter-sort-grid mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-10">
                                    <p className="mb-0 d-block" style={{width: "100px"}}>Sort By:</p>
                                    <select
                                        name="options"
                                        className="form-control form-select"
                                        id="options"
                                        onChange={Sort}
                                    >
                                        <option value="best-selling">Best Selling</option>
                                        <option value="price-ascend">Price Ascend</option>
                                        <option value="name-ascend">Name Ascend</option>
                                    </select>
                                </div>
                                <div className="d-flex align-items-center gap-10">
                                    <p className="totalproducts mb-0">{`${count} Products`}</p>
                                    <div className="d-flex gap-10 align-items-center grid">
                                        <img onClick={() => {
                                            setGrid(3)
                                        }} src="/images/ico/icons8-grip-lines-32.png"
                                             className="d-block img-fluid" alt="grid"></img>
                                        <img onClick={() => {
                                            setGrid(4)
                                        }} src="/images/ico/icons8-grip-lines-vertical-32.png"
                                             className="d-block img-fluid" alt="grid"></img>
                                        <img onClick={() => {
                                            setGrid(6)
                                        }} src="/images/ico/icons8-grip-lines-vertical-32.png"
                                             className="d-block img-fluid" alt="grid"></img>
                                        <img onClick={() => {
                                            setGrid(12)
                                        }} src="/images/ico/icons8-grip-lines-vertical-32.png"
                                             className="d-block img-fluid" alt="grid"></img>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="products-list pb-5">
                            <div className="d-flex gap-10 flex-wrap">
                                {products.map((product) => (
                                    <ProductCard key={product._id} product={product} grid={grid}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
export default OurStore
