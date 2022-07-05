import { useState } from "react";
import axios from 'axios';
import './AddCompany.css'

const AddData = (props) => {
const [companyName, setCompanyName] = useState("")
const [location, setLocation] = useState("")
const [desc, setDesc] = useState("")


const data =[companyName, location, desc]

const submitHandler = async(e) =>{
    e.preventDefault()
    axios
    .post('http://localhost:8000/addCompanyData', data)
    .then(() => {
      console.log('Company Data Created');
      alert('User added Successfully');
    })
    .catch(err => {
      console.error(err);

    }
    

    );
    props.fetchCompanyData()
    setCompanyName("");
    setLocation("");
    setDesc('');
}

    return (
        <div className="mx-4 addData" >
            <form className="form-inline" onSubmit={submitHandler} >
                <input type="Name" value={companyName} onChange={(e) =>setCompanyName(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Company Name" />
                <input type="Age" value={location} onChange={(e) =>setLocation(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Location" />
                <input type="Id" value={desc} onChange={(e) =>setDesc(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Desc" />
                <button type="submit" className="btn btn-primary mb-2">Add</button>
            </form>
        </div>
    )
}

export default AddData;