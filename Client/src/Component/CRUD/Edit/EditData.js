import { useEffect, useState } from "react";
import axios from 'axios';
// import { confirmAlert } from "react-confirm-alert";
import './EditData.css'
const EditData = (props) =>{

const [updatedName, setUpdatedName] = useState(props.name)
const [updatedAge, setUpdatedAge] = useState(props.age)
const [updatedId, setUpdatedId] = useState(props.id)
const updatedData = [updatedName, updatedAge, updatedId, props.id]

const editHandler= (e) =>{
    e.preventDefault()
 console.log(updatedData)
    axios
    .post('http://localhost:8000/editData', updatedData)
    .then(() => {
      console.log('Data Updated');
      props.fetchData()
    })
    .catch(err => {
      console.error(err);
    });
    props.fetchData()
    alert('Data edited sucessfully')
    props.setShowDatabase(true)
    props.setVisible(false)
}

const cancelHandler = (e) => {
    e.preventDefault();
    props.setShowDatabase(true)
    props.setVisible(false)
}

const onInputChange = (e) =>{
    console.log(e.target.value)
}


    return(
        <div >
        <div className=" container editcardd col-5" >
            <h1 className="head"><b>Edit User Data</b> </h1>
            {/* <div className="data">{props.name} {props.age} {props.id}</div> */}
            <div className=" " >
            <form className="form"   >
                <div className="editLabel">
                <label className="editLabel"> Update Name</label>
                <input type="Name" value={updatedName} onChange={(e)=> setUpdatedName(e.target.value)} className="form-control mb-2 mr-sm-2" placeholder="Enter Name" />
                </div>

                <div className="editLabel">
                <label >Update Age</label>
                <input type="Age" value={updatedAge} onChange={(e)=> setUpdatedAge(e.target.value)} className="form-control mb-2 mr-sm-2" placeholder="Enter Age" />
                </div>

                <div className="editLabel">
                <label >Update Id</label>
                <input type="Id" value={updatedId} onChange={(e)=> setUpdatedId(e.target.value)} className="form-control mb-2 mr-sm-2" placeholder="Enter Id" />
                </div>

                <button type="submit" onClick={editHandler} className="btn btn-primary mb-2" style={{marginRight:"20px" }}>Edit</button>
                <button type="submit" onClick={cancelHandler} className="btn  btn-danger mb-2" style={{marginLeft:"20px" }}>Cancel</button>
            </form>
        </div>
            </div>
            </div>
    )
}
export default EditData;