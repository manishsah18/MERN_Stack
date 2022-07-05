import { useState } from "react";
import axios from 'axios';
import './AddOrder.css'

const AddData = (props) => {
const [orderId, setOrderId] = useState("")
const [customer, setCustomer] = useState("")
const [address, setAddress] = useState("")

const [shipmentNo, setShipmentNo] = useState("")
const [companyName, setCompanyName] = useState("")
const [trailerNo, setTrailerNo] = useState("")
const [tenantId, setTenantId] = useState("")
const [tenantName, setTenantName] = useState("")
const [deliveredDate, setDeliveredDate] = useState("")

const data =[orderId, customer, address, shipmentNo, companyName, trailerNo, tenantId, tenantName, deliveredDate]

const submitHandler = async(e) =>{
    e.preventDefault()
    console.log(data)
    
    axios
    .post('http://localhost:8000/addOrdersData', data)
    .then(() => {
      console.log('Data Created');
    //   props.fetchData()
      alert('User added Successfully');
    })
    .catch(err => {
      console.error(err);

    });
    props.fetchOrderData()
    alert('Order Details added Successfully');
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
      <div className=" container editOrderCard col-5" >
          <h1 className="head"><b>Add order Details</b> </h1>
          <div className=" " >
              <form className="form"   >
                 
                  <div className="editLabel">
                      <label >Order Id</label>
                      <input type="Age"  value={orderId} onChange={(e) =>setOrderId(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter OrderId" />
                  </div>

                  <div className="editLabel">
                      <label >Customer Name</label>
                      <input type="Id" value={customer} onChange={(e) =>setCustomer(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Customer Name" />
                  </div>

                  <div className="editLabel">
                      <label className="editLabel">Address</label>
                      <textarea type="Name" value={address} onChange={(e) =>setAddress(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Address" />
                  </div>

                  <div className="editLabel">
                      <label >Shipment No</label>
                      <input type="Id" value={shipmentNo} onChange={(e) =>setShipmentNo(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Shipment No." />
                  </div>
                  <div className="editLabel">
                      <label >Company Name</label>
                      <input type="Id" value={companyName} onChange={(e) =>setCompanyName(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Company Name" />
                  </div>
                  <div className="editLabel">
                      <label >Trailer No</label>
                      <input type="Id" value={trailerNo} onChange={(e) =>setTrailerNo(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Trailer No." />
                  </div>
                  <div className="editLabel">
                      <label >Tenant Id</label>
                      <input type="Id" value={tenantId} onChange={(e) =>setTenantId(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Tenant Id" />
                  </div>
                  <div className="editLabel">
                      <label >Tenant Name</label>
                      <input type="Id" value={tenantName} onChange={(e) =>setTenantName(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Tenant Name" />
                  </div>
                  <div className="editLabel">
                      <label >Delivered Date</label>
                      <input type="date" value={deliveredDate} onChange={(e) =>setDeliveredDate(e.target.value) } className="form-control mb-2 mr-sm-2" placeholder="Enter Delivered Date" />
                        
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