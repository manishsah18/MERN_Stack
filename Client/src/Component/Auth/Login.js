import "./Login.css"
import React, { useState } from 'react';
// import { HttpRequest } from "./FirebaseApi/HttpRequest";
import {toast} from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../Header/Navbar.css"




const Login = () => {
  const [query, setQuery] = useState({  Email: "", Password: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setQuery(prevState => ({
      ...prevState,
      [name]: value

    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(query)

    axios
      .post('http://localhost:8000/login', query, { withCredentials: true })
      .then(() => {
        console.log('Login Successfull');
        alert('Login Successfull');
        navigate('/database');
      })
      .catch(err => {
        console.log(err);
        console.log(err.response.data.error);
        alert(err.response.data.error);
      });
      
    
  }

  return (
    <div className="box" >
      <h3 style={{ textAlign: "center", textDecoration: "underline", color: "black", fontFamily: "italic" }}><b> Login Here</b></h3>
      <form className="contact" onSubmit={submitHandler}>

        <div className="form-group input">
          <label htmlFor="E-mail" className="login-label"><b> Username :</b></label>
          <input type="maill" className="form-control field" onInvalid={e => e.target.setCustomValidity('Please Enter Valid E-mail Address ( Example- test@domain.com)')}
            onInput={e => e.target.setCustomValidity('')} value={query.Email} onChange={handleChange} name="Email"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="Enter your Email" />
        </div>

        <div className="form-group input">
        <label htmlFor="password" className="login-label"><b> Password :</b> </label>
          <input type="password" className="form-control field" value={query.Password} onChange={handleChange}  name="Password"  placeholder="Enter your password"/>
        </div>

        <div className="button">
          <button type="submit" className="btn btn-success ">Login</button>
        </div>
        <Link className=" login " to="/register"><b>Not Registered? Click here to register</b></Link>
      </form>
    </div>

  );

}
export default Login;