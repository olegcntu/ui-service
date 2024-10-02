import React, {useState} from 'react'
import {useParams} from 'react-router-dom';
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import {CustomInput} from "../components/CustomInput";
import API_ROUTES from "../api";

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [error, setError] = useState(null);

    const {token} = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`${API_ROUTES.USER_SERVICE}/user/reset-password/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({password})
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            } else {
                window.location.href = 'http://localhost:3000/login';
            }

            // handle success
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            <Meta title={"Reset Password"}/>
            <BreadCrumb title="Reset Password"/>
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Reset Password</h3>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit} className="d-flex flex-column gap-30">
                                <CustomInput type="password" name="password" placeholder="Password" value={password}
                                             onChange={(e) => setPassword(e.target.value)}/>
                                <CustomInput type="password" name="confpassword" placeholder="Confirm Password"
                                             value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>

                                <div>
                                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                        <button className="button border-0">Ok</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ResetPassword;
