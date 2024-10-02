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
import ProductCardCompare from "../components/ProductCardCompare";
import UserComponent from "../components/UserComponent";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_ROUTES.USER_SERVICE}/user/all-users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    };
    const blockUser = async (id) => {
        console.log("111111111111")
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_ROUTES.USER_SERVICE}/user/block-user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchUsers()
        } catch (error) {
            console.log(error);
        }
    };
    const unBlockUser = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_ROUTES.USER_SERVICE}/user/unblock-user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchUsers()
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <Meta title={"Admin"}/>
            <BreadCrumb title="Admin"/>
            <Container class1="store-wrapper home-wrapper-2 py-5">
                <div className="user-list-container">
                    {users.map(user => (
                        <UserComponent
                            unBlockUser={()=>unBlockUser(user._id)}
                            blockUser={()=>blockUser(user._id)}
                            isBlock={user.isBlocked}
                            id={user._id}
                            firstName={user.firstname}
                            lastName={user.lastname}
                            email={user.email}
                            mobile={user.mobile}
                            role={user.role}
                            createdAt={user.createdAt}
                            updatedAt={user.updatedAt}
                            v={user.__v}
                        />
                    ))}
                </div>
            </Container>
        </>
    )
}
export default Admin
