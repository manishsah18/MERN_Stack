import "./Register.css"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import "../Header/Navbar.css"




const Register = () => {
  const [query, setQuery] = useState({ Name: "", Email: "", ContactNo: "", Password: "", ConfirmPassword: "" });
  const navigate = useNavigate();
  const handleChange = e => {
    const { name, value } = e.target;
    setQuery(prevState => ({
      ...prevState,
      [name]: value

    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(query)
   
      const res = await fetch('http://localhost:8000/register',{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
      }) ;

      const data = await res.json();
      console.log(data)
      console.log(res)


      if(res.status === 422 || !data){
        window.alert(data.error)
        console.log(data.error)
      }
      else{
        window.alert("Registration successfull")
        console.log("Registration successfull")
        setQuery({ Name: "", Email: "", ContactNo: "", Description: "" });
        navigate('/login');
      }

  }

  return (
    <div className="box" >
      
      <h3 style={{ textAlign: "center", textDecoration: "underline", color: "black", fontFamily: "italic" }}><b> Register yourself</b></h3>
      <form className="contact" onSubmit={submitHandler}>
        <div className="form-group input ">
          <input type="Name" className="form-control field" value={query.Name} onChange={handleChange} name="Name" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Name" />
        </div>
        <div className="form-group input">
          <input type="maill" className="form-control field" onInvalid={e => e.target.setCustomValidity('Please Enter Valid E-mail Address ( Example- test@domain.com)')}
            onInput={e => e.target.setCustomValidity('')} value={query.Email} onChange={handleChange} name="Email"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="Enter your Email" />
        </div>

        <div className="form-group input">
          <input type="Contact-no" className="form-control field" value={query.ContactNo} onChange={handleChange} name="ContactNo" onInvalid={e => e.target.setCustomValidity('Please Enter 10 Digit Mobile No.')}
            onInput={e => e.target.setCustomValidity('')}  pattern="[6-9]{1}[0-9]{9}" id="exampleInputPassword1" placeholder="Enter your contact no." />
        </div>
        <div className="form-group input">
          <input type="password" className="form-control field" name="Password" value={query.Password} onChange={handleChange} placeholder="Enter your password"/>
        </div>
        <div className="form-group input">
          <input type="password" className="form-control field" name="ConfirmPassword" value={query.ConfirmPassword} onChange={handleChange}  placeholder="Re-Enter your password" />
        </div>

        <div className="button">
          <button type="submit" className="btn btn-success ">Register</button>
        </div>
        <Link className=" login " to="/login"><b>Already registered? Sign in</b></Link>
      </form>

    </div>
  );

}
export default Register;







 
    //  axios
    //   .post('http://localhost:8000/register', query)
    //   .then(() => {
    //     alert("fasdfghalse")
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
    //   alert("User Registered Successfully")
    //   navigate('/login');
    //   setQuery({ Name: "", Email: "", ContactNo: "", Description: "" });
    // }