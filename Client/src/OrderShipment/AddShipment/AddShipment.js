import { useState } from "react";
import axios from 'axios';
import './AddShipment.css'
import TextArea from "antd/lib/input/TextArea";

const AddData = (props) => {
const [shipmentId, setShipmentId] = useState("")
const [customer, setCustomer] = useState("")
const [address, setAddress] = useState("")


const data =[shipmentId, customer, address]

const submitHandler = async(e) =>{
    e.preventDefault()
    axios
    .post('http://localhost:8000/addShipmentData', data)
    .then(() => {
      console.log('Data Created');
      alert('User added Successfully');
    })
    .catch(err => {
      console.error(err);

    });
    props.fetchShipmentData()
    alert('Shipment Details added Successfully');
    props.closeModel(false)
    props.showDatabase(true)


    // setName("");
    // setAge("");
    // setId('');
}
const cancelHandler = async(e) =>{
    e.preventDefault()
    props.closeModel(false)
    props.showDatabase(true)
  }

    return (
          
      <div >
      <div className=" container editcard col-5" >
          <h1 className="head"><b>Add Shipment Details</b> </h1>
          <div className=" " >
              <form className="form"   >
                 
                  <div className="editLabel">
                      <label >Shipment Id</label>
                      <input type="Age"  value={shipmentId} onChange={(e) =>setShipmentId(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Shipment Id" />
                  </div>

                  <div className="editLabel">
                      <label >Customer Name</label>
                      <input type="Id" value={customer} onChange={(e) =>setCustomer(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Customer Name" />
                  </div>

                  <div className="editLabel">
                      <label className="editLabel">Address</label>
                      <TextArea type="Name" value={address} onChange={(e) =>setAddress(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Address" />
                  </div>

                  <button type="submit" onClick={submitHandler} className="btn btn-primary mb-2" style={{ marginRight: "20px" }}>Add</button>
                  <button type="submit" onClick={cancelHandler} className="btn  btn-danger mb-2" style={{ marginLeft: "20px" }}>Cancel</button>

              </form>
          </div>
      </div>
  </div>
    )
}

export default AddData;