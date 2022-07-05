// import { useNavigate } from 'react-router-dom';
import React from 'react';
// import  { useState, useEffect } from 'react';
import './OrderDetails.css'
import { BsPersonCircle } from 'react-icons/bs';
import { GrNotes } from 'react-icons/gr';
import Navbar from './OdNavbar';
import Tab from './OdTabs';
import { GoPrimitiveDot } from 'react-icons/go';
import { BiTimeFive } from 'react-icons/bi';
import { BsArrowDownSquare } from 'react-icons/bs';


const OrderDetails = (props) => {
    // const navigate = useNavigate()
    // console.log(props.rangeData)

    const DisplayData = props.rangeData
    .map(
        (data, id) => {
            return (
                <div key={id} className='col-sm-12' >
                    <div className=' card 'style={{backgroundColor: 'white', color:'black', marginBottom:'15px'}}>
                    <div style={{color:'black', fontFamily:'italic', fontSize:'20px'}}><b>{data.CustomerName}</b></div>
                    <div>{data.OrderId}</div>
                    <div>{data.DeliveryTime}</div>
                </div>
                </div>

            )
        }
    )

    return (
        <div className='main'>
            <div className='main-sub' >

                <div className='verticle-navbar'>
                    <Navbar />
                </div>

                <div className=' left'>
                    <div className='left-heading'>
                        RELATED ORDERS({props.rangeData.length}) <br />
                       <p className='date'> jan 12,2022 - Mar 18,2022</p>
                    </div>
                    <div className='left-data'>

                    {/* <div className="row" >
                        {DisplayData}
                    </div> */}

                    </div>
                </div>

                <div className=' right'>
                    <div className='right-heading'>
                        <div className='order'>
                        <GrNotes size={25} />  ORDER - <b>{props.data[0].OrderId}</b></div>
                    </div>

                    <div className='right-data'>

                        <div className='right-data-address'>
                            <div className='right-data-billing'>
                            <div className='bill'>
                               <p> <BsPersonCircle /> BILL TO </p>
                                <b>{props.data[0].CustomerName}</b> <br />
                                {props.data[0].Address}
                            </div>

                            <div className='ship'>
                               <p> <BsPersonCircle /> SHIP TO </p>
                                <b>{props.data[0].CustomerName}</b> <br />
                                {props.data[0].Address}

                            </div>
                            </div>

                            <div className='tabb' >
                            <Tab />
                            </div>
                        </div>

                        <div className='right-data-info'>
                            <div className='quick-info'>
                                <p>QUICK INFO</p>
                            </div>
                            <div className='quick-info-details'>
                                <div className='menu'>
                                <p>Status <span id='span1'> Created <GoPrimitiveDot color='green' size={17} /> </span> </p>
                                <p>Has Rejections <span id='span2'> No  </span></p>
                                <p>Order Value <span id='span3'> $76.50  </span></p>
                                <p>Sales Contact <span id='span4'> messy@drakesdrinks.com </span></p>
                                <p>Customer PO <span id='span5'>GC1206785   </span></p>
                                </div>
                            </div>
                            <div className='timeline'>
                               <p> TIMELINE <BsArrowDownSquare size={22} color='black' id='time' />  <span id='clock'><BiTimeFive color='blue' size={18}/></span></p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    )
}

export default OrderDetails;


