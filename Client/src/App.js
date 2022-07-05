
import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './Component/SearchBar/SearchBar';
import Table from './Component/Table/Table';
import Register from './Component/Auth/Register'
import Login from './Component/Auth/Login';
import Navbar from './Component/Header/Navbar'
import { Link } from "react-router-dom";
import "./Component/Header/Navbar.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditData from './Component/CRUD/Edit/EditData';
import GoogleMapApi from './Component/GoogleMap/GoogleMapApi';
import Company from './Company/Company'
import Factory from './Factory/Factory';
import OrderShipment from './OrderShipment/Main';
import OrderDetails from './OrderShipment/OrderDetails/OrderDetails';
import Logout from './Component/Auth/Logout';

function App() {

  const url = "/api";
  const [data, setData] = useState([{}]);
  const [companyData, setCompanyData] = useState([{}]);
  const [factoryData, setFactoryData] = useState([{}]);
  const [orderViewData, setOrderViewData] = useState([{}])
  const [rangeData, setRangeData] = useState([{}])


  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json)
      console.log(json);
    } catch (error) {
      console.log("error", error);
    }
  };


  const fetchCompanyData = async () => {
    try {
      const response = await fetch("/company");
      const json = await response.json();
      setCompanyData(json)
      console.log(json);
    } catch (error) {
      console.log("error", error);
    }
  };
  
  useEffect(() => {
       fetchCompanyData();
     }, []);

     

      //factory response
     const fetchFactoryData = async (company) => {
      try {
        const response = await fetch(`/viewData/${company}`);
        const json = await response.json();
        setFactoryData(json)
      } catch (error) {
        console.log("error", error);
      }
    };

    useEffect(() => {
      fetchFactoryData()
    }, []);

  const sort = (sorted) => {
    setData(sorted)
  }

  const viewFactoryData = (viewData) => {
    console.log(viewData)
    setFactoryData(viewData);
  }

  const companyName = (companyName) => {
    console.log(companyName)
    // setCompany(companyName)
  }

  const [show, setShow] = useState(false);

  const showTable = (showTable) => {
    setShow(true)
    console.log(showTable)
  }
  // console.log(orderViewData);

  return (
    < Router>
      <div className="App">
        <Navbar />
        <Routes>

          <Route exact path="/" element={
            <div>
              <h2> Welcome to my Database Manager</h2>
              <div className='nav-item '>
                <Link className="nav-link login  " to="/googleMap"> <button> <b>Click Here To Explore Google Map</b> </button></Link>
              </div>
            </div>
          } />

          <Route exact path="/googleMap" element={
            <GoogleMapApi />} />

          <Route exact path="/delivery" element={
            <OrderShipment setOrderViewData={setOrderViewData} setRangeData={setRangeData} />} />
           
          <Route exact path="/delivery/orderdetails" element={
            
            <OrderDetails data={orderViewData} rangeData={rangeData} />} />

          <Route exact path="/editData" element={
            <EditData />} />

             <Route exact path="/company" element={
            <Company data={companyData} fetchCompanyData={fetchCompanyData} companyName={companyName} viewFactoryData={viewFactoryData} sort={sort} />} />

            <Route exact path="/company/factory" element={
            <Factory data={factoryData} fetchFactoryData={fetchFactoryData} sort={sort} />} />

          <Route exact path="/database" element={
            <div>
              <div className='header'>
                <div className='emp'>
                  <h2><b> Employee Details</b></h2>
                </div>

                <div>
                  <Link className="  btn btn-danger logout " to="/logout"><b>Log Out</b></Link>
                </div>

              </div>
              <SearchBar fetchData={fetchData} showTable={showTable} />
              {show ?
                <div>
                  <div >
                    <i className="fa fa-refresh fa-spin" style={{ fontSize: '35px', padding: "60px", visibility: 'hidden' }} ></i>
                  </div>
                  <div className='bottomDiv'>
                    <Table data={data} fetchData={fetchData} sort={sort} />
                  </div>
                </div>
                : null}
            </div>
          } />

          <Route exact path="/register" element={
            <Register />} />
          <Route path="/login" element={
            <Login />} />
            <Route exact path="/logout" element={
            <Logout />} />

        </Routes>
      </div>
    </Router>

  );
}

export default App;
