
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "antd/dist/antd.css";
import 'antd/dist/antd.css';
import axios from 'axios';
import '../Component/Table/Table.css'
import EditFactory from './CRUD/Edit/EditFactory'
import AddFactory from './CRUD/Add/AddFactory'
import { useNavigate } from 'react-router-dom';






function Factory(props) {
    const navigate = useNavigate();
    const [order, setOrder] = useState("ASC")
    const [pageNumber, setPageNumber] = useState(0);
    const [noOfPage, setNoOfPage] = useState(16);
    const [visible, setVisible] = useState(false)
    const [showDatabase, setShowDatabase] = useState(true)
    const [Factory, setFactory] = useState("")
    const [location, setLocation] = useState("")
    const [desc, setDesc] = useState("")
    const [company, setCompany] = useState("")
    const [identifier, setIdentifier] = useState(0)




    const usersPerPage = noOfPage;
    const pagesVisited = pageNumber * usersPerPage;


    const deleteData = async (identifier, company) => {
        console.log(company)
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to delete this??.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        console.log(identifier)
                        axios.delete(`http://localhost:8000/deleteFactory/${identifier}`).then(
                            (response) => {
                                props.sort(
                                    props.data.filter((val) => {
                                        return val !== identifier;
                                    })
                                );
                            }
                        );
                        alert('User deleted Successfully')
                        props.fetchFactoryData(company);
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    };


    const DisplayData = props.data
        .slice(pagesVisited, pagesVisited + usersPerPage).map(
            (data, id) => {
                return (
                    <div key={id} className='col-sm-3' >
                        <div className=' card 'style={{backgroundColor: 'black', color:'white', marginBottom:'15px'}}>
                        {/* <div>{data._id}</div> */}
                        {/* {data.Company} */}
                        <div style={{color:'yellow', fontFamily:'italic', fontSize:'20px'}}><b>{data.Factory}</b></div>
                        <div>{data.Location}</div>
                        <div>{data.Description}</div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ margin:'2px' }}><button className={`btn btn-sm btn-success`} onClick={() => { return (setVisible(true), setCompany(data.Company), setShowDatabase(false), setFactory(data.Factory), setLocation(data.Location), setIdentifier(data._id), setDesc(data.Description)) }} >Edit</button></div>
                            <div style={{ margin:'2px' }}> <button className={`btn btn-sm btn-danger `} onClick={(e) => deleteData(data._id, data.Company)}>Delete</button></div>
                        </div>
                    </div>
                    </div>

                )
            }
        )
                console.log(!DisplayData.length)


    const pageCount = Math.ceil(props.data.length / usersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className="App">
            <div >
            <h3>Factory Portal</h3>
           <button className='btn btn-sm btn-success' onClick={() => navigate('/company')}>Go Back</button>
           </div>
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
                        <AddFactory DisplayData={DisplayData} fetchFactoryData={props.fetchFactoryData}/>
                    </div>
                     { DisplayData.length ?                                                        
                    <div className="row" >
                        {DisplayData}
                    </div>
                    : <h3 style={{marginTop: '70px' }}> No Factory details to display</h3> }    

                </div>

            }
            {visible && <EditFactory company={company} factory={Factory} location={location} desc={desc} identifier={identifier} fetchFactoryData={props.fetchFactoryData} setVisible={setVisible} setShowDatabase={setShowDatabase} />}

        </div>
    );
}

export default Factory;
