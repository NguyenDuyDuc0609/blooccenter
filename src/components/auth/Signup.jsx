import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signupConfig } from '../../services/authServices';
import { useToast } from '../../context/ToastContext';
import { useLoading } from '../../context/LoadingContext';
import { useAxiosPublic } from '../../hooks/useAxiosPublic';
export const Signup = () => {
  const [UserName, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [FullName, setFullName] = useState('');
  const [RepeatPassword, setRepeatPassword] = useState('');
  const {showToast} = useToast();
   const { showLoading, hideLoading } = useLoading();
   const {request} = useAxiosPublic();
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
      setUsername(e.target.value);
  }
  const handlePasswordChange = (e) => {
      setPassword(e.target.value);
  }
  const handleSetEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handleFullnameChange = (e) =>{
    setFullName(e.target.value);
  }
  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();
    await new Promise((resolve) => setTimeout(resolve, 100));
    hideLoading();
    if (Password !== RepeatPassword) {
      window.alert("Passwords do not match!");
      return;
    }

    try {
          const result = await request(signupConfig(UserName, Password, Email, FullName));

          if (result.success === true) {
            showToast({ message: 'Đăng ký thành công!', success: true });
            navigate('/login');
          } else {
            showToast({ message: result.message || 'Đăng ký thất bại.', success: false });
          }

        } catch (error) {
          showToast({ message: error.message || 'Đăng ký thất bại. Vui lòng thử lại!', success: false });
          console.error('Signup error:', error);
        }
  };

  return (
    <div>
      <section className="vh-100" style={{ width : '100%' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: '25px' }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0" data-mdb-input-init="">
                            <label className="form-label" htmlFor="form3Example1c">Username</label>
                            <input type="text" id="form3Example1c" className="form-control" value={UserName} onChange={handleUsernameChange} />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0" data-mdb-input-init="">
                            <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                            <input type="text" id="form3Example1c" className="form-control" value={FullName} onChange={handleFullnameChange} />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0" data-mdb-input-init="">
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                            <input type="email" id="form3Example3c" className="form-control" value={Email} onChange={handleSetEmailChange} />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0" data-mdb-input-init="">
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                            <input type="password" id="form3Example4c" className="form-control" value={Password} onChange={handlePasswordChange} />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0" data-mdb-input-init="">
                            <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                            <input type="password" id="form3Example4cd" className="form-control" value={RepeatPassword} onChange={handleRepeatPasswordChange} />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg" data-mdb-button-init="" data-mdb-ripple-init="">Register</button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="Sample image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}