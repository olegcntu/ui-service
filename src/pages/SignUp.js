import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { CustomInput } from "../components/CustomInput";
import API_ROUTES from "../api";

function SignUp() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const registerUser = async (userData) => {
        try {
            const response = await axios.post(`${API_ROUTES.USER_SERVICE}/user/register`, userData);
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            console.error(error);
            setError(error.response.data.message);
        }
    }

    return (
        <>
            <Meta title={"Sign Up"} />
            <BreadCrumb title="Sign Up" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Sign Up</h3>
                            <form action="" className="d-flex flex-column gap-30">
                                <CustomInput type="text" name="firstname" placeholder="Firstname" />
                                <CustomInput type="text" name="lastname" placeholder="Lastname:" />
                                <CustomInput type="email" name="email" placeholder="Email" />
                                <CustomInput type="tel" name="mobile" placeholder="Mobile Number" />
                                <CustomInput type="password" name="password" placeholder="Password" />

                                {error && <div className="text-danger">{error}</div>}

                                <div>
                                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                        <button className="button border-0" onClick={(e) => {
                                            e.preventDefault();
                                            registerUser({
                                                firstname: document.getElementsByName("firstname")[0].value,
                                                lastname: document.getElementsByName("lastname")[0].value,
                                                email: document.getElementsByName("email")[0].value,
                                                mobile: document.getElementsByName("mobile")[0].value,
                                                password: document.getElementsByName("password")[0].value,
                                            })
                                        }}>Create</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {error && (
                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </>
    )
}

export default SignUp;
