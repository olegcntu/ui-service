import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home'
import Contact from './pages/Contact'
import Layout from './components/Layout'
import About from "./pages/About";
import OurStore from "./pages/OurStore";
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
import WishList from "./pages/WishList";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import SingleBlog from "./pages/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import AdminBlog from "./pages/AdminBlog";

function App() {
    return (
        <h1>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="about" element={<About/>}/>
                        <Route path="contact" element={<Contact/>}/>
                        <Route path="product" element={<OurStore/>}/>
                        <Route path="product/:id" element={<SingleProduct/>}/>
                        <Route path="blogs" element={<Blog/>}/>
                        <Route path="blog/:id" element={<SingleBlog/>}/>
                        <Route path="cart" element={<Cart/>}/>
                        <Route path="checkout" element={<Checkout/>}/>
                        <Route path="compare-product" element={<CompareProduct/>}/>
                        <Route path="wishlist" element={<WishList/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="forgot-password" element={<ForgotPassword/>}/>
                        <Route path="signup" element={<SignUp/>}/>
                        <Route path="reset-password/:token" element={<ResetPassword/>}/>
                        <Route path="privacy-policy" element={<PrivacyPolicy/>}/>
                        <Route path="refund-policy" element={<RefundPolicy/>}/>
                        <Route path="shipping-policy" element={<ShippingPolicy/>}/>
                        <Route path="term-conditions" element={<TermsAndConditions/>}/>
                        <Route path="my-account" element={<Account/>}/>
                        <Route path="create-product" element={<CreateProduct/>}/>
                        <Route path="edit-product/:id" element={<EditProduct/>}/>
                        <Route path="orders" element={<Orders/>}/>
                        <Route path="admin-user" element={<Admin/>}/>
                        <Route path="admin-blog" element={<AdminBlog/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </h1>
    )
        ;
}

export default App;
