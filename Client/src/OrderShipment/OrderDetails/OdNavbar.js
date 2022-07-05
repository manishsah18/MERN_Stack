import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    PrinterOutlined,
    DatabaseOutlined,
    BellOutlined
  } from '@ant-design/icons';
  import { Button, Menu } from 'antd';
  import { useState } from 'react';
  import { IoIosArrowForward } from 'react-icons/io';
  import { IoIosArrowBack } from 'react-icons/io';
  import { Navigate, useNavigate } from "react-router-dom";
  import './OrderDetails.css'

  const Navbar = () => {

    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };
    const navigate = useNavigate()
    return (
      <div
        style={{
          width: 250,
        }}
        className= 'flexnav'
      >
         <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 0,
           marginRight: 170,
           backgroundColor: 'dark',
           width: "5rem"
          }}
        >
          {collapsed ? <IoIosArrowForward color='blue' size={15} id='back'/> : <IoIosArrowBack color='blue' size={15} id='back'/>}
        </Button> 
        <Menu
          defaultSelectedKeys={['0']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items= {[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Home',
              onClick: ()=>navigate('/delivery')
            },
            {
              key: '2',
              icon: <PrinterOutlined />,
              label: 'Print Data',
            },
            {
              key: '3',
              icon: <DatabaseOutlined />,
              label: 'Order Item',             
            },
            {
              key: '4',
              icon: <BellOutlined />,
              label: 'Alert',
            }
          ]}
          
        />
      </div>
    );
  };
  
  export default Navbar