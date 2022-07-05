import { useEffect, useState } from "react";
import axios from 'axios';
// import { confirmAlert } from "react-confirm-alert";
import './EditFactory.css'
const EditData = (props) =>{

const [updatedFactory, setUpdatedFactory] = useState(props.factory)
const [updatedLocation, setUpdatedLocation] = useState(props.location)
const [updatedDesc, setUpdatedDesc] = useState(props.desc)
const updatedFactoryData = [updatedFactory, updatedLocation, updatedDesc, props.identifier]




const editHandler= (e) =>{
    e.preventDefault()
 console.log(updatedFactoryData)
    axios
    .put('http://localhost:8000/editFactoryData', updatedFactoryData)
    .then(() => {
      console.log('Factory Data Updated');
     
    })
    .catch(err => {
      console.error(err);
    });
    // console.log(props.company);
    props.fetchFactoryData(props.company)
    alert('Factory Details edited sucessfully')
   
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
        <div className=" container editcard col-5" >
            <h1 className="head"><b>Edit Factory Details</b> </h1>
            {/* <div className="data">{props.name} {props.age} {props.id}</div> */}
            <div className=" " >
            <form className="form"   >
                <div className="editLabel">
                <label className="editLabel"> Update Factory Name</label>
                <input type="Name" value={updatedFactory} onChange={(e)=> setUpdatedFactory(e.target.value)} className="form-control mb-2 mr-sm-2" placeholder="Enter Factory Name" />
                </div>

                <div className="editLabel">
                <label >Update Location</label>
                <input type="Age" value={updatedLocation} onChange={(e)=> setUpdatedLocation(e.target.value)} className="form-control mb-2 mr-sm-2" placeholder="Enter Location" />
                </div>

                <div className="editLabel">
                <label >Update Description</label>
                <input type="Id" value={updatedDesc} onChange={(e)=> setUpdatedDesc(e.target.value)} className="form-control mb-2 mr-sm-2" placeholder="Enter Desc" />
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