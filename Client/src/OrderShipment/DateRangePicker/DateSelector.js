
import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, DatePicker, Button } from 'antd';
import "antd/dist/antd.css";
import { useState } from 'react';
// class DateSelector extends React.Component {
//   render()
  const DateSelector = (props) =>{
    const [filteredOrderData, setFilteredOrderData] = useState([{}]);

      const { RangePicker } = DatePicker;
      const formItemLayout = {
        labelCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 8,
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 16,
          },
        },
      };
      const config = {
        rules: [
          {
            type: 'object',
            required: true,
            message: 'Please select time!',
          },
        ],
      };
      const rangeConfig = {
        rules: [
          {
            type: 'array',
            required: true,
            message: 'Please select time!',
          },
        ],
      };
      const TimeRelatedForm = () => {
        const onFinish = (fieldsValue) => {
          // Should format date value before submit.
          const rangeValue = fieldsValue['range-picker'];
         
          const values = {
            ...fieldsValue,
            // 'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
          
            'rangePicker': [rangeValue[0].format('YY-MM-DD'), rangeValue[1].format('YY-MM-DD')],
          
          };
          //Getting input values
          console.log(values);
          props.setDateRange(values)
          console.log(values.rangePicker);


          const fetchOrderData = async () => {
            try {
              const response = await fetch(`/orders/${values.rangePicker}`);
              const json = await response.json();
              setFilteredOrderData(json)
              props.setOrderData(json)
              // console.log(json);
            } catch (error) {
              console.log("error", error);
            }
          };
          fetchOrderData();

          // useEffect(() => {
          //   fetchOrderData();
          // }, []);

          const fetchShipmentData = async () => {
            try {
              const response = await fetch(`/shipment/${values.rangePicker}`);
              const json = await response.json();
              setFilteredOrderData(json)
              props.setShipmentData(json)
              // console.log(json);
            } catch (error) {
              console.log("error", error);
            }
          };
          fetchShipmentData();

        };
        
  return (
    <Form name="time_related_controls" {...formItemLayout} onFinish={onFinish}>
      {/* <Form.Item name="date-picker" label="DatePicker" {...config}>
        <DatePicker />
      </Form.Item> */}
     
      <div style={{display : 'flex'  }}>

      <div style={{marginRight: '0px'  }}>
      <Form.Item name="range-picker"  {...rangeConfig}>
        <RangePicker />
      </Form.Item>
      </div>

      <div style={{marginRight: '0px'  }} >
      <Form.Item
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        }}
      >
        <Button type="primary" htmlType="submit" style={{marginRight: '0px'  }}>
          Submit
        </Button>
      </Form.Item>
      </div>

      </div>
    </Form>
  );
};

  return (
    <div className="MainDiv">
      <div className="container">  
      <TimeRelatedForm />
        </div>
      </div>
  );
}
// }
export default DateSelector;






