import React, {useState} from 'react'
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import {Link} from "react-router-dom";
import Container from "../components/Container";
import {CustomInput} from "../components/CustomInput";
import API_ROUTES from "../api";
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        };

        try {
            const response = await fetch(`${API_ROUTES.USER_SERVICE}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const json = await response.json();

                localStorage.setItem('token', json.token);
                localStorage.setItem('username', json.firstname);
                localStorage.setItem('userEmail', json.email);
                localStorage.setItem('role', json.role);
                window.location.href = '/';
            } else {
                const errorResponse = await response.json();
                setError(errorResponse.message);
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    return (
        <>
            <Meta title="Login" />
            <BreadCrumb title="Login" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Login</h3>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit} className="d-flex flex-column gap-30">
                                <CustomInput
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <CustomInput
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div>
                                    <Link to="/forgot-password">Forgot Password?</Link>
                                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                        <button className="button border-0" type="submit">
                                            Login
                                        </button>
                                        <Link to="/signup" className="button signup">
                                            Sign Up
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Login
