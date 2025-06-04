import React, { useState } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';
import { useToast } from '../../context/ToastContext';
import { forgotPasswordConfig } from '../../services/authServices';
import { ForgotPassword } from '../auth/ForgotPassword';
import { ResetPassword } from './ResetPassword';
import { resetPassword } from '../../services/userServices';
import { useAxiosPublic } from '../../hooks/useAxiosPublic';
export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); 
    const { showLoading, hideLoading } = useLoading();
    const { showToast } = useToast();
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [userData, setUserData] = useState('');
    const {request} = useAxiosPublic();
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleForgotPassword = () => {
        setShowForgotPassword(true);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleSendEmail = async (email) => {
        showLoading();
        try {
            const res = await request(forgotPasswordConfig(email));
            if (res.success) {
            showToast({ message: res.message || "Đã gửi email đặt lại mật khẩu!", success: true });
            setShowForgotPassword(false);
            }
            else {
            showToast({ message: res.message || "Gửi email thất bại.", success: false });
            }
        } catch (error) {
            showToast({ message: error.message || 'Gửi email thất bại.', success: false });
        } finally {
            hideLoading();
            setShowForgotPassword(false);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        showLoading();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        hideLoading();
        try {
            const userData = await login(username, password);
            if (userData.success === true) {
                showToast({ message: 'Đăng nhập thành công!', success: true });
                navigate('/dashboard/activityGoing?page=1');
            }
            else if(userData.data !== null && userData.data !== undefined) {
                showToast({ message: userData.message, success: false });
                setUserData(userData.data);
                setShowResetPassword(true);
            }
            else {
                showToast({ message: userData.message, success: false });
                navigate('/login');
            }
            } catch (error) {
            showToast({ message: error.message || 'Đăng nhập thất bại.', success: false });
            } finally {
            hideLoading();
            }
    };
    const handleResetPassword = async (form) => {
        showLoading();
        try{
            const res = await request(resetPassword((form)));
            if (res.success) {
                showToast({ message: res.message || "Đặt lại mật khẩu thành công!", success: true });
                navigate('/login');
            } else {
                showToast({ message: res.message || "Đặt lại mật khẩu thất bại.", success: false });
            }
        }
        catch (error) {
            showToast({ message: error.message || 'Đặt lại mật khẩu thất bại.', success: false });
        } finally {
            hideLoading();
            setShowResetPassword(false);
        }
        setUserData('');
    }
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
                        <a href="#!" onClick={handleForgotPassword}>Forgot password?</a>
                    </div>
                </div>

                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Login</button>

                <div className="text-center">
                    <p>Not a member? <Link to="/signup">Register</Link></p>
                </div>
            </form>
            {showForgotPassword && (
                <ForgotPassword onSubmit={handleSendEmail} onCancel={() => setShowForgotPassword(false)}/>
            )}
            {showResetPassword && (
                <ResetPassword username={userData} onSubmit={handleResetPassword} onCancel={() => setShowResetPassword(false)} />
            )}
        </div>
    );
};