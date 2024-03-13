import React, { useState } from 'react'
import '../index.css'
import axios from 'axios'
import logo from '../Assets/logo.png'
import { EyeInvisibleOutlined, EyeTwoTone,LockOutlined, UserOutlined  } from '@ant-design/icons';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { pt_login_url } from '../config';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const Login = () => {
    const [user_id, setUser_id] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loggingin = (event) => {
        event.preventDefault();
        const requestData = { user_id, password }
        axios.post(`${pt_login_url}`, requestData)
            .then((result) => {
               
                if (result.status === 200 && result.data.status === true) {
                    sessionStorage.setItem("token", result.data.data.token);
                    console.log(result.data.token);
                    sessionStorage.setItem('user', JSON.stringify(result.data.data.user));
                    dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.data.user });
                    toast.success('User Logged In Successfully!');
                    navigate('/dashboard')
                }
                else{
                    toast.error(result.data.error);
                }
            })
            .catch((error) => {
               
                toast.error(error.response.data.message);
            })
    }
    return (
        <>
            <div className="container-fluid loginbg" style={{ height: '100vh' }}>
                <div className="row h-100">
                    {/* <div className="col-6 "> */}
                        
                    {/* </div>\ */}
                    <div className='col-lg-6 col-xl-4 col-12 col-md-8 p-5 rounded-4 blurloginbox shadow-lg mx-auto my-auto border border-2 border-light'>
                        <img className='mb-5 d-flex justify-content-center mx-auto' width='165px' height='29px' src={logo} alt="earthoodlogo" />
                        <p className='text-center fw-bolder' style={{ fontSize: '50px', fontWeight: '700', lineHeight: '60.51px' }}><span className='textcolorblue text-center'>Welcome to</span><br /><span className='textcolor text-center'>Earthood</span></p>
                        <p className='text-white text-center'>Sign in to your account</p>
                        <form onSubmit={(e) => { loggingin(e) }}>
                            {/* <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label textcolorblue">Username</label>
                            {/* <input type="email" placeholder="youremail@gmail.com" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" /> */}
                            {/* <Input value={user_id} onChange={(e) => setUser_id(e.target.value)} type="text" placeholder="username" />
                    </div> */}
                            <div className="mb-3">
                                <label htmlFor="exampleInput" className="form-label textcolor">Username</label>
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} value={user_id} onChange={(e) => setUser_id(e.target.value)} type="text" placeholder="username" id='exampleInput' aria-label="default input example" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Password1" className="form-label textcolor">Password</label>
                                {/* <input type="password" placeholder="Enter your Password" className="form-control" id="exampleInputPassword1" /> */}
                                <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type='password'
                                    id='Password1'
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    placeholder="password"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </div>
                            <div className="d-flex justify-content-between">
                                {/* <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label textgrey" htmlFor="exampleCheck1">Remember me</label>
                                </div> */}
                                <Link to="/forgotpassword" className="textcolor text-end text-decoration-underline mb-3">Forgot Password?</Link>
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-success border-0 bg_green text-white" type="submit">Sign in</button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >

        </>
    )
}

export default Login
