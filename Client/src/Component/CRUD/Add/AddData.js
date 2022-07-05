import { useState } from "react";
import axios from 'axios';
import './AddData.css'

const AddData = (props) => {
const [name, setName] = useState("")
const [age, setAge] = useState("")
const [id, setId] = useState("")


const data =[name, age, id]

const submitHandler = async(e) =>{
    e.preventDefault()
    axios
    .post('http://localhost:8000/addData', data)
    .then(() => {
      console.log('Data Created');
      props.fetchData()
      alert('User added Successfully');
    })
    .catch(err => {
      console.error(err);

    });

    setName("");
    setAge("");
    setId('');
}

    return (
        <div className="mx-4 addData" >
            <form className="form-inline" onSubmit={submitHandler} >
                <input type="Name" value={name} onChange={(e) =>setName(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Name" />
                <input type="Age" value={age} onChange={(e) =>setAge(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Age" />
                <input type="Id" value={id} onChange={(e) =>setId(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Id" />
                <button type="submit" className="btn btn-primary mb-2">Add</button>
            </form>
        </div>
    )
}

export default AddData;