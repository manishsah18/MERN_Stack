
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "antd/dist/antd.css";
import 'antd/dist/antd.css';
import AddData from '../CRUD/Add/AddData';
import axios from 'axios';
import './Table.css'
import EditData from '../CRUD/Edit/EditData';
import Modal from 'antd/es/modal';
import Switch from 'antd/es/switch';
const { confirm } = Modal;



function Tablee(props) {

  const [order, setOrder] = useState("ASC")
  const [pageNumber, setPageNumber] = useState(0);
  const [noOfPage, setNoOfPage] = useState(10);
  const [visible, setVisible] = useState(false)
  const [showDatabase, setShowDatabase] = useState(true)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [id, setId] = useState(0)
  const [activity, setActivity] = useState('active')

  

  const usersPerPage = noOfPage;
  const pagesVisited = pageNumber * usersPerPage;

  
  const deleteData = async (id, e) => {

    // e.preventDefault();

    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to delete this??.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            console.log(id)
            axios.delete(`http://localhost:8000/deleteData/${id}`).then(
              (response) => {
                props.sort(
                  props.data.filter((val) => {
                    return val !== id;
                  })
                );
              }
            );
            alert('User deleted Successfully')
            props.fetchData();
          }
        },
        {
          label: 'No',
          // onClick: () => alert('')
        }
      ]
    });
  };

  const [checked, setChecked] = useState(false)

  const handleToggle = (e) => {
    if (!checked) {
      confirm ({ 
        title: "Are you sure you want to disable the user ?",
        okText: 'Yes',
        cancelText: 'No',
        onOk() {
          console.log('switched toggled')
          // e.stopPropagation()
          setActivity("inactive")
          setChecked(true)
      }})
    } else {
      console.log('switched not toggled')
      setActivity("active")
      setChecked(false)
    }
  }

  // const handleClick =(e)=>{
  //   e.stopPropagation()
  // }

  const DisplayData = props.data
    .slice(pagesVisited, pagesVisited + usersPerPage).map(
      (data, id) => {
        return (
          <tr key={id}>
            <td>{data.NAME}</td>
            <td>{data.AGE}</td>
            <td>{data.ID}</td>
            <td>{data.CreatedAt}</td>
            <td ><button className={`btn btn-success ${activity}`}  onClick={() => {return(setVisible(true) ,setShowDatabase(false), setName(data.NAME),setAge(data.AGE),setId(data.ID) ) }} >Edit</button></td>
            <td> <button className={`btn btn-danger ${activity}`}  onClick={(e) => deleteData(data.ID, e)}>Delete</button></td>
            <td><Switch  onChange={()=> handleToggle()} checked={checked} /></td>
            {/* <td> <label className="switch">
                <input
                  id={data.ID}
                  type="checkbox"
                  defaultChecked={checked}
                  onChange={() => {
                  setChecked(!checked);
                  // dis(user.SNo);
                  handleToggle(data.ID)
                  }}
                />
                <span className="slider round"></span>
              </label>
              </td> */}
            {/* onClick={(e) => toggleHandler(e, data.ID)} */}
            {/* checked={state} onChange={()=>handleChange(state)} */}
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
          <AddData DisplayData={DisplayData} fetchData={props.fetchData}/>
        </div>

        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th onClick={() => sorting("NAME")}>NAME</th>
              <th onClick={() => sorting("AGE")}>AGE</th>
              <th onClick={() => sorting("ID")}>ID</th>
              <th onClick={() => sorting("Created At")}>Created At</th>
              <th >Edit</th>
              <th >Delete</th>
              <th >Disable</th>

            </tr>
          </thead>
          <tbody>

            {DisplayData}

          </tbody>
        </table>
       
      </div>
     
}
{visible && <EditData name={name} age={age} id={id} fetchData={props.fetchData} setVisible={setVisible} setShowDatabase={setShowDatabase} />}
     
    </div>
  );
}

export default Tablee;
