import React, {useState} from 'react';
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import {Link} from "react-router-dom";
import Container from "../components/Container";
import {CustomInput} from "../components/CustomInput";
import API_ROUTES from "../api";
function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        setMessage("");
        const data = {email};
        fetch(`${API_ROUTES.USER_SERVICE}/user/forgot-password-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                setIsLoading(false);
                return response.json();
            })
            .then((data) => {
                if (data.result) {
                    setMessage("We sent a message to your email");
                } else {
                    setErrorMessage(data.message);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                setErrorMessage(data.message);
            });
    };

    return (
        <>
            <Meta title={"Forgot Password"}/>
            <BreadCrumb title="Forgot Password"/>
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Reset Your Password</h3>
                            <p className="text-center mt-2 mb-3">We will send you an email to reset your password</p>
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            {message && <div className="alert alert-success">{message}</div>}
                            <form onSubmit={handleSubmit} className="d-flex flex-column gap-30">
                                <CustomInput type="email" name="email" placeholder="Email"
                                             onChange={(e) => setEmail(e.target.value)}/>
                                <div
                                    className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                                    <button className="button border-0" type="submit"
                                            disabled={isLoading}>{isLoading ? "Loading..." : "Submit"}</button>
                                    <Link to="/login">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ForgotPassword;
