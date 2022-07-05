import ShipmentTab from "./ShipmentTab";
import { Table } from "antd";
import "antd/dist/antd.css";
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const onChange = (key) => {
  console.log(key);
};

const columns = [
    {
      title: "Item",
      dataIndex: "item",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3
      }
    },
    {
      title: "Product Code",
      dataIndex: "productCode",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3
      }
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2
      }
    },
    {
      title: "Item Value",
      dataIndex: "itemValue",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1
      }
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1
      }
    },
    {
      title: "Planned Delivery Time",
      dataIndex: "plannedDeliveryTime",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1
      }
    }
  ];
  const data = [
    // {
    //   key: "1",
    //   item: "Manish",
    //   productCode: 28,
    //   quantity: 16,
    //   itemValue: 189,
    //   status: "Delivered",
    //   plannedDeliveryTime: "20/06/2022"
    // },
    
  ];
  
  const onChangee = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };


const Tab = () => (
  <Tabs defaultActiveKey="1" onChange={onChange} >

    <TabPane tab="SHIPMENTS" key="1" className='tab'>
      <ShipmentTab/>
    </TabPane>

    <TabPane tab="ORDER ITEMS" key="2">
      <Table columns={columns} dataSource={data} onChange={onChangee} />
    </TabPane>

    <TabPane tab="ALERTS(0)" key="3">
      Content of Tab  Alert
    </TabPane>

  </Tabs>
);

export default Tab;