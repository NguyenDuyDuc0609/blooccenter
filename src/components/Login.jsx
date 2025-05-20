import React, { useState } from 'react';
import './css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';
import { useToast } from '../context/ToastContext';
export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); 
    const { showLoading, hideLoading } = useLoading();
    const { showToast } = useToast();
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        showLoading();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        hideLoading();
        try {
            const userData = await login(username, password);

            if (userData.success === true) {
                showToast({ message: 'Đăng nhập thành công!', success: true });
                navigate('/');
            } else {
                showToast({ message: userData.message, success: false });
                navigate('/login');
            }
            } catch (error) {
            showToast({ message: error.message || 'Đăng nhập thất bại.', success: false });
            console.error('Login error:', error);
            } finally {
            hideLoading();
            }
    };

    return (
        <div className="d-flex justify-content-center align-items-center mx-auto" style={{ height: '100vh', width: '500px' }}>
            <form className="mt-20 w-300" style={{ width: '400px' }} onSubmit={handleSubmit}>
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example1">Username</label> 
                    <input type="text" id="form2Example1" className="form-control" value={username} 
                        onChange={handleUsernameChange} required />
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example2">Password</label>
                    <input type="password" id="form2Example2" className="form-control" value={password} 
                        onChange={handlePasswordChange} required />
                </div>

                <div className="row mb-4">
                    <div className="col">
                        <a href="#!">Forgot password?</a>
                    </div>
                </div>

                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Login</button>

                <div className="text-center">
                    <p>Not a member? Not a member? <Link to="/signup">Register</Link></p>
                </div>
            </form>
        </div>
    );
};