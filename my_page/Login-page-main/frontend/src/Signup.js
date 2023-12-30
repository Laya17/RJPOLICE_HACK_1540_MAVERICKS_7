
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation'; 
import axios from 'axios';
import BackgroundImage from '../src/images/bg2.jpg';


function Signup() {
 
  const navigate = useNavigate();

  
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    age: '', 
    address: '' 
  });

  const [errors, setErrors] = useState({});

  
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    
    setErrors(Validation(values));
  
    if (errors.name === "" && errors.email === "" && errors.password === "") {
      
      axios.post('http://localhost:5000/storeUserData', values)
        .then(() => {
          
          navigate('/login'); 
        })
        .catch(err => console.log(err));
    }
  };
  

  
  return (
    <div className='d-flex justify-content-center align-items-center vh-100' style={Bgstyle}>
      <div id="reg-form">
        <form action="" onSubmit={handleSubmit} id="reg-form-1">
          <div className='mb-3'>
            <label htmlFor='name'><strong>Name</strong></label>
            <input
              type='text'
              placeholder='Enter your name'
              name='name'
              onChange={handleInput}
              id="name"
            />
            {errors.name && <span className='text-danger'>{errors.name}</span>}
          </div>

          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input
              type='email'
              placeholder='Enter Email'
              name='email'
              onChange={handleInput}
              id="email"
            />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>

          <div className='mb-3'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input
              type='password'
              placeholder='Enter password'
              name='password'
              onChange={handleInput}
              id="password"
            />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>

       
          <div className='mb-3'>
            <label htmlFor='age'><strong>Age</strong></label>
            <input
              type='text'
              placeholder='Enter your age'
              name='age'
              onChange={handleInput}
              id='age'
            />
          
          </div>

        
          <div className='mb-3'>
            <label htmlFor='address'><strong>Address</strong></label>
            <input
              type='text'
              placeholder='Enter your address'
              name='address'
              onChange={handleInput}
              id='address'
            />
          
          </div>

          <button type='submit' className='btn btn-success w-100' id="login-btn"><strong>Sign Up</strong></button>
          <p />
          <p id="p"><input type='checkbox' required id='checkbox' />Agree to all Terms and Policies</p>
          <p id="p">Already have an account? <Link to='/Login'>login</Link></p>
        </form>
      </div>
    </div>
  );
}


const Bgstyle = {
  background: `url(${BackgroundImage})`, 
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};


export default Signup;




