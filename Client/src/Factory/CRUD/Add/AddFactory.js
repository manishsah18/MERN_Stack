import { useState } from "react";
import axios from 'axios';
import './AddFactory.css'

const AddFactoryData = (props) => {
const [companyName, setCompanyName] = useState("")
const [factoryName, setFactoryName] = useState("")
const [location, setLocation] = useState("")
const [desc, setDesc] = useState("")


const data =[factoryName, location, desc, companyName]

const submitHandler = async(e) =>{
    e.preventDefault()
    axios
    .post('http://localhost:8000/addFactoryData', data)
    .then(() => {
      console.log('Factory Data Created');
      alert('User added Successfully');
    })
    .catch(err => {
      console.error(err);

    }
    

    );
    console.log(data[3])
    props.fetchFactoryData(data[3])
    setCompanyName("");
    setFactoryName("");
    setLocation("");
    setDesc('');
}

    return (
        <div className="mx-4 addData" >
            <form className="form-inline" onSubmit={submitHandler} >
                 <input style={{width:'140px'}} type="Name" value={companyName} onChange={(e) =>setCompanyName(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Company" />
                <input style={{width:'180px'}} type="Name" value={factoryName} onChange={(e) =>setFactoryName(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Factory Name" />
                <input style={{width:'140px'}} type="Age" value={location} onChange={(e) =>setLocation(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Location" />
                <input style={{width:'140px'}} type="Id" value={desc} onChange={(e) =>setDesc(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Desc" />
                <button type="submit" className="btn btn-primary mb-2">Add</button>
            </form>
        </div>
    )
}

export default AddFactoryData;