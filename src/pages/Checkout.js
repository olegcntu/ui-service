import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {BiArrowBack} from 'react-icons/bi'
import API_ROUTES from "../api";

const Checkout = () => {
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('username');

    const [address, setAddress] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [subTotal, setSubTotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [total, setTotal] = useState(0);
    const [telephone, setTelephone] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProduct()
    }, [total,subTotal,shipping]);
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
            calculateSubTotal(data.cart);
            calculateShipping(data.cart);
            calculateTotal();
        } catch (error) {
            console.log(error);
        }
    };
    const calculateShipping=(data)=>{
        if(subTotal>5){
            setShipping(0)
        }
        else {
            setShipping(data.length*3);
        }
    }
    const calculateTotal=()=>{
        setTotal(subTotal+shipping)
    }
    const calculateSubTotal = (data) => {
        let totalPrice = 0;
        data.forEach((item) => {
            const {product, quantity} = item;
            const {price} = product;
            const itemTotal = price * quantity;
            totalPrice += itemTotal;
        });
        setSubTotal(totalPrice);
    };


    const handleFirstNameChange = (event) => {
        setNameInput(event.target.value);
    };
    const handleTelephoneChange = (event) => {
        setTelephone(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastNameInput(event.target.value);
    };
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handleApartmentChange = (event) => {
        setApartment(event.target.value);
    };
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const productData = {
            address: address,
            name: nameInput,
            lastName: lastNameInput,
            apartment: apartment,
            city:city,
            telephone: telephone
        };
        fetch(`${API_ROUTES.PRODUCT_SERVICE}/product/order-creation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(productData)
        })
            .then((response) => response.json())
            .then((data) => {

            })
            .catch((error) => {
                console.error('Error', error);
            });
    };


    return <>
        <div className="checkout-wrapper py-5 home-wrapper-2">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-7">
                        <div className="checkout-left-data">
                            <h3 className="website-name">Dev Corner</h3>
                            <nav style={{"--bs-breadcrumb-divider:": ">"}} aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item total-price">
                                        <Link className="text-dark" to="/cart">Cart</Link>
                                    </li>
                                    <li className="breadcrumb-item active total-price" aria-current="page">Information
                                    </li>
                                    <li className="breadcrumb-item active total-price">
                                        Shipping
                                    </li>
                                    <li className="breadcrumb-item active total-price" aria-current="page">Payment</li>
                                </ol>
                            </nav>
                            <h4 className="title total"> Contact Information </h4>
                            <p className="user-details total">{name} ({email})</p>
                            <h4 className="mb-3">Shipping Address</h4>
                            <form action=""  className="d-flex gap-15 flex-wrap justify-content-between">
                                <div className="w-100">
                                    <select
                                        name=""
                                        className="form-control form-select"
                                    >
                                        <option value="" selected disabled>USA</option>
                                    </select>
                                </div>
                                <div className="flex-grow-1">
                                    <input type="text"
                                           placeholder="First Name"
                                           className="form-control"
                                           value={nameInput}
                                           onChange={handleFirstNameChange}/>
                                </div>
                                <div className="flex-grow-1">
                                    <input type="text"
                                           placeholder="Lat Name"
                                           className="form-control"
                                           value={lastNameInput}
                                           onChange={handleLastNameChange}/>
                                </div>
                                <div className="w-100">
                                    <input type="text"
                                           placeholder="Address"
                                           className="form-control"
                                           value={address}
                                           onChange={handleAddressChange}/>
                                </div>
                                <div className="w-100">
                                    <input type="text"
                                           placeholder="Apartment, suit, etc(optional)"
                                           className="form-control"
                                           value={apartment}
                                           onChange={handleApartmentChange}/>
                                </div>
                                <div className="flex-grow-1">
                                    <input type="text"
                                           placeholder="City"
                                           className="form-control"
                                           value={city}
                                           onChange={handleCityChange}/>
                                </div>
                                <div className="flex-grow-1">
                                    <input type="text"
                                           placeholder="Telephone Number"
                                           className="form-control"
                                           value={telephone}
                                           onChange={handleTelephoneChange}/>
                                </div>
                                <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link className="text-dark" to="/cart"><BiArrowBack className="me-2"/>Return to
                                            Card</Link>
                                        <Link className="button"  onClick={handleSubmit} to="/cart">Continue</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="border-bottom py-4">

                        </div>
                        <div className="border-bottom py-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="total">SubTotal</p>
                                <p className="total-price">${subTotal}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 total">Shipping</p>
                                <p className="mb-0 total-price">${shipping}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                            <h4 className="total">Total</h4>
                            <h5 className="total-price">${total}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Checkout
