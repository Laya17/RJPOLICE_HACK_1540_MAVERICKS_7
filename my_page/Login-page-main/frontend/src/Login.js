import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackgroundImage from '../src/images/bg1.jpg';
import userImage from '../src/images/user.png';

function Login() {
    const [values, setValues] = useState({
        customerId: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    
       
        axios.post('http://localhost:5000/login', values)
            .then(response => {
                console.log('Login response:', response.data);
    
                
                if (response.status === 200) {
                    
                    navigate(`/user/${response.data.customer_id}`);
                } else {
                    
                    console.log('Login failed:', response.data.message);
                }
            })
            .catch(err => {
                console.log('Login error:', err);
               
            });
    };
    

    const Bgstyle = {
        background: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100' style={Bgstyle}>
            <div id="form">
                <img src={userImage} alt="User" className="user-image" />
                <form action="" onSubmit={handleSubmit} id="form1">
                    <h2 className="text-center" id="h2text">LOGIN</h2>
                    <div className='mb-3'>
                        <label htmlFor="customerId"><strong>Customer ID</strong></label>
                        <div className="input-container">
                            <input
                                type='text'
                                placeholder='Enter customer ID'
                                name='customerId'
                                onChange={handleInput}
                                id='customerId'
                            />
                        </div>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <div className="input-container">
                            <input
                                type='password'
                                placeholder='Enter password'
                                name='password'
                                onChange={handleInput}
                                id='password'
                            />
                        </div>
                    </div>
                    <button type='submit' className='btn btn-success w-100' id="login-btn"><strong>Login</strong></button>
                    <p></p>
                    <p id='p'>New User? <Link to="/Signup">Create</Link> an account</p>
                </form>
            </div>
        </div>
    );
}

export default Login;
