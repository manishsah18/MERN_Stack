
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "antd/dist/antd.css";
import 'antd/dist/antd.css';
import AddData from '../Component/CRUD/Add/AddData';
import axios from 'axios';
import '../Component/Table/Table.css'
import EditData from '../Component/CRUD/Edit/EditData';
import EditCompany from './CRUD/Edit/EditCompany'
import AddCompany from './CRUD/Add/AddCompany'
import { NavLink } from 'react-router-dom';





function Company(props) {

  const [order, setOrder] = useState("ASC")
  const [pageNumber, setPageNumber] = useState(0);
  const [noOfPage, setNoOfPage] = useState(10);
  const [visible, setVisible] = useState(false)
  const [showDatabase, setShowDatabase] = useState(true)
  const [company, setCompany] = useState("")
  const [location, setLocation] = useState("")
  const [desc, setDesc] = useState("")
  const [identifier, setIdentifier] = useState(0)
  const [viewData, setViewData] = useState("")

  

  

  const usersPerPage = noOfPage;
  const pagesVisited = pageNumber * usersPerPage;

  
  const deleteData = async (identifier, e) => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to delete this??.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            console.log(identifier)
            axios.delete(`http://localhost:8000/deleteCompany/${identifier}`).then(
              (response) => {
                props.sort(
                  props.data.filter((val) => {
                    return val !== identifier;
                  })
                );
              }
            );
            alert('User deleted Successfully')
            props.fetchCompanyData();
          }
        },
        {
          label: 'No',
        }
      ]
    });
  };

    const viewHandler =(company) =>{
      console.log(company)

      const fetchFactoryData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/viewData/${company}`);
          const json = await response.json();
          setViewData(json)
          console.log(json);
          console.log(viewData);
          props.viewFactoryData(json);
          props.companyName(company);
        } catch (error) {
          console.log("error", error);
        }
      };
      
      fetchFactoryData();
  
      
    }

    // useEffect(() => {
    //   fetchFactoryData();
    // }, [2]);

  const DisplayData = props.data
    .slice(pagesVisited, pagesVisited + usersPerPage).map(
      (data, id) => {
        return (
          <tr key={id}>
            <td>{data._id}</td>
            <td>{data.Company}</td>
            <td>{data.Location}</td>
            <td>{data.Description}</td>
            <td ><button className={`btn btn-success `}  onClick={() => {return(setVisible(true) ,setShowDatabase(false), setCompany(data.Company),setLocation(data.Location),setIdentifier(data._id), setDesc(data.Description) ) }} >Edit</button></td>
            <td> <button className={`btn btn-danger `}  onClick={(e) => deleteData(data._id, e)}>Delete</button></td>
            <td> <NavLink to={'./factory'} className={`btn btn-primary `} onClick={() => viewHandler(data.Company)}  >View</NavLink></td>
          </tr>
        )
      }
    )

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...props.data].sort((a, b) =>
        parseInt(a[col]) > parseInt(b[col]) ? 1 : -1

      );
      props.sort(sorted)
      setOrder("DSC")
    };
    if (order === "DSC") {
      const sorted = [...props.data].sort((a, b) =>
        parseInt(a[col]) < parseInt(b[col]) ? 1 : -1
      );
      
      props.sort(sorted)
      setOrder("ASC")
    };
  }

  const pageCount = Math.ceil(props.data.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="App">
      <h3>Company Portal</h3>
        {showDatabase &&
      <div className="container mt-3 ">
        <div className='page'>

          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Customize page</button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button className="dropdown-item" type="button" onClick={() => setNoOfPage(10)}>10/Page</button>
              <button className="dropdown-item" type="button" onClick={() => setNoOfPage(20)}>20/page</button>
              <button className="dropdown-item" type="button" onClick={() => setNoOfPage(50)}>50/page</button>
              <button className="dropdown-item" type="button" onClick={() => setNoOfPage(100)}>100/page</button>
            </div>
          </div> 

         

          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            onPageChange={changePage}
            containerClassName={"pagination justify-content-center"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"active"}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName='page-item'
            nextClassName='page-item'
            breakClassName='page-item'
            breakLinkClassName='page-link'

          />
           {/* {visible && <EditData name={name} age={age} id={id} fetchData={props.fetchData} setShowDatabase={setShowDatabase} />} */}
          <AddCompany DisplayData={DisplayData} fetchCompanyData={props.fetchCompanyData}/>
        </div>

        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th onClick={() => sorting("Sl No.")}>Sl No.</th>
              <th onClick={() => sorting("Company")}>Company</th>
              <th onClick={() => sorting("Location")}>Location</th>
              <th onClick={() => sorting("Desc")}>Desc</th>
              <th >Edit</th>
              <th >Delete</th>
              <th >View</th>

            </tr>
          </thead>
          <tbody>

            {DisplayData}

          </tbody>
        </table>
       
      </div>
     
}
{visible && <EditCompany company={company} location={location} desc={desc} identifier={identifier} fetchCompanyData={props.fetchCompanyData} setVisible={setVisible} setShowDatabase={setShowDatabase} />}
     
    </div>
  );
}

export default Company;
