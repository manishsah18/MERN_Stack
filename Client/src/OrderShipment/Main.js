
import React, { useState, useEffect } from 'react';
// import ReactPaginate from 'react-paginate';
// import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "antd/dist/antd.css";
// import axios from 'axios';
import '../Component/Table/Table.css'
import { Link } from 'react-router-dom';
import DateSelector from "./DateRangePicker/DateSelector";
import './Main.css'
import AddOrder from './AddOrder/AddOrder'
import AddShipment from './AddShipment/AddShipment'


function OrderShipment(props) {
  const [openAddOrderModel, setOpenAddOrderModel] = useState(false)
  const [openAddShipmentModel, setOpenAddShipmentModel] = useState(false)

  const [showDatabase, setShowDatabase] = useState(true)
  const [type, setType] = useState("Order");

  const [orderData, setOrderData] = useState([{}])
  const [shipmentData, setShipmentData] = useState([{}])

  // const [orderViewData, setOrderViewData] = useState([{}])
  
  const [dateRange, setDateRange] = useState({rangePicker: ''})

  const fetchOrderData = async () => {
    try {
      const response = await fetch("/orders");
      const json = await response.json();
      setOrderData(json)
      // console.log(json);
    } catch (error) {
      console.log("error", error);
    }
  };
    
  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchShipmentData = async () => {
    try {
      const response = await fetch("/shipment");
      const json = await response.json();
      setShipmentData(json)
      // console.log(json);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchShipmentData();
  }, []);
  
   const orderViewHandler = (id) =>{
      const fetchFactoryData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/viewOrderData/${id}`);
          const json = await response.json();
          props.setOrderViewData(json)
          props.setRangeData(orderData)
          // console.log(orderData);
          // console.log(json);
        } catch (error) {
          console.log("error", error);
        }
      };
      
      fetchFactoryData();
  

   }

  var DisplayData =[{}]
    if(type === 'Order'){
       DisplayData = orderData.map(
        (data, id) => {
          return (
            <tr key={id} className='table-success'>
              <td>{data._id}</td>
              <td><Link className="nav-link " to="./orderdetails" onClick={() => orderViewHandler(data.OrderId)} >{data.OrderId}</Link> </td>
              <td>{data.CustomerName}</td>
              <td>{data.DeliveryTime}</td>
              <td>{data.Address}</td>
            </tr>
          )
        }
      )
    }else if(type ==='Shipment')
    {
       DisplayData = shipmentData.map(
        (data, id) => {
          return (
            <tr key={id} className='table-danger'>
              <td>{data._id}</td>
              <td>{data.OrderId}</td>
              <td>{data.CustomerName}</td>
              <td>{data.DeliveryTime}</td>
              <td>{data.Address}</td>
            </tr>
          )
        }
      )
    }

  const orderHandler = () => {
    setOpenAddOrderModel(true);
    setShowDatabase(false)
  }

  const shipmentHandler = () => {
    setOpenAddShipmentModel(true)
    setShowDatabase(false);
  }
  
  return (
    <div className="App">



      {showDatabase &&
        <div className="container mt-3 ">
          <div className='page'>
            <div>
            {dateRange.rangePicker[0]} <br />
            {dateRange.rangePicker[1]}
              <div><h1>Order and Shipment Data</h1></div>
              <button style={{ margin: "10px" }} onClick={orderHandler} className='btn  btn-success'>Add Order Details</button>
              <button className='btn  btn-primary' onClick={shipmentHandler}>Add Shipment Details</button>

              <div className="selectors">

                <div className="dropdown element-left">
                  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" >Select</button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button className="dropdown-item" type="button" onClick={() => setType("Order")}>Orders</button>
                    <button className="dropdown-item" type="button" onClick={() => setType("Shipment")}>Shipments</button>
                  </div>
                </div>

                <div className="element-right">
                  <DateSelector setDateRange = {setDateRange} setOrderData={setOrderData} setShipmentData={setShipmentData}/>
                </div>

              </div>
            </div>

            <div>

            </div>

          </div>
          <div style={{ margin: "10px" }}>
            <table className="table table-dark table-hover  table-striped">
              <thead>
                <tr>
                  <th >Sl No.</th>
                  <th> {type} Id</th>
                  <th >Customer Name</th>
                  <th >Delivery Date</th>
                  <th >Address</th>
                </tr>
              </thead>
              <tbody >

                {DisplayData}

              </tbody>
            </table>
          </div>
        </div>

      }
      {openAddOrderModel && <AddOrder closeModel={setOpenAddOrderModel} showDatabase={setShowDatabase} fetchOrderData={fetchOrderData} />}
      {openAddShipmentModel && <AddShipment closeModel={setOpenAddShipmentModel} showDatabase={setShowDatabase} fetchShipmentData={fetchShipmentData} />}
    </div>
  );
}

export default OrderShipment;
