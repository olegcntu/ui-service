import React, {useEffect, useState} from 'react'
import {NavLink, Link} from "react-router-dom";
import {BsSearch} from "react-icons/bs";
import ChatComponent from "./ChatComponent";

function Header() {
    const [username, setUsername] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const role = localStorage.getItem('role');
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);
    const handleLogout = () => {
        setUsername('');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('role');
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleMouseEnter = () => {
        clearTimeout(timeoutId);
    };

    const handleMouseLeave = () => {
        const id = setTimeout(() => {
            setIsDropdownOpen(false);
        }, 300);
        setTimeoutId(id);
    };
    return (
        <>
            <header className="header-top-strip py-3">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-6">
                            <p className="text-white mb-0">Free Shipping Over 5$</p>
                        </div>
                        <div className="col-6">
                            <p className="text-end text-white mb-0">
                                Hotline:<a className="text-white" href="tel:+380969794628">+38 (096)-979-46-8</a>
                            </p>
                        </div>
                    </div>
                </div>
            </header>
            <header className="header-upper py-3">
                <div className="container-xxl">
                    <div className="row align-items-center">
                        <div className="col-2">
                            <h1><Link className="text-white">Laptop Standard</Link></h1>
                        </div>
                        <div className="col-5">
                            <div className="input-group">
                                <input type="text"
                                       className="form-control py-2"
                                       placeholder="Search Product Hear..."
                                       aria-label="Search Product Hear..."
                                       aria-describedby="basic-addon2"/>
                                <span className="input-group-text p-3" id="basic-addon2">
                                    <BsSearch className="fs-6"/>
                                </span>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="header-upper-links d-flex align-items-center justify-content-between">
                                <div>
                                    <Link to="/compare-product" className="d-flex align-items-center gap-10 text-white">
                                        <img src="/images/compare.png" alt="compare"/>
                                        <p className="mb-0">
                                            Compare <br/> products
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="wishlist" className="d-flex align-items-center gap-10 text-white">
                                        <img src="/images/wishlist.png" alt="wishlist"/>
                                        <p className="mb-0">
                                            Favourite <br/> wishlist
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    {username ? (
                                        <div
                                            className="dropdown-menu-user d-flex align-items-center gap-10 text-white"
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <div
                                                className="dropdown-menu-user__toggle"
                                                onClick={handleDropdownToggle}
                                            >
                                                <img src="/images/user.png" alt="user"/>

                                            </div>
                                            <p className="mb-0">{username}</p>
                                            {isDropdownOpen && (
                                                <div className="dropdown-menu-user__content">
                                                    <ul>
                                                        <li>
                                                            <Link to="/my-account" className="dropdown-item text-black">
                                                                Account
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link onClick={handleLogout}
                                                                  className="dropdown-item text-black">
                                                                Log Out
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link to="/login" className="d-flex align-items-center gap-10 text-white">
                                            <img src="/images/user.png" alt="user"/>
                                            <p className="mb-0">
                                                Log in
                                                <br/> My Account
                                            </p>
                                        </Link>
                                    )}
                                </div>
                                <div>
                                    <Link to="/cart" className="d-flex align-items-center gap-10 text-white">
                                        <img src="/images/cart.png" alt="cart"/>
                                        <div className="d-flex flex-column gap-10">
                                            <span className="badge bg-white text-dark">0</span>
                                        </div>
                                    </Link>
                                </div>
                                <div>
                                   <ChatComponent></ChatComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <header className="header-bottom py-3">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="menu-bottom d-flex align-items-center gap-30">
                                <div>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            <img src="/images/menu.png" alt="cart"/>
                                            <span className="me-5 d-inline-block">Shop Categories</span>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><Link className="dropdown-item text-white" to="#">Action</Link></li>
                                            <li><Link className="dropdown-item text-white" to="#">Another action</Link>
                                            </li>
                                            <li><Link className="dropdown-item text-white" to="#">Something else
                                                here</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="menu-links">
                                    <div className="d-flex align-items-center gap-15">
                                        <NavLink to="/">Home</NavLink>
                                        <NavLink to="/product">Our Store</NavLink>
                                        <NavLink to="/blogs">Blogs</NavLink>
                                        <NavLink to="/contact">Contact</NavLink>
                                        <NavLink to="/orders">Orders</NavLink>
                                        {role==='admin' ? <NavLink to="/admin-user">User-Admin</NavLink> : <></>}
                                        {role==='admin' ? <NavLink to="/admin-blog">Blog-Admin</NavLink> : <></>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
