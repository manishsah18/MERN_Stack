
import React from 'react';
import 'antd/dist/antd.css';
import { useState, useEffect } from 'react';
import { FiTruck } from 'react-icons/fi';
import { CgMenuBoxed } from 'react-icons/cg';
import { BsBoxSeam } from 'react-icons/bs';
import { GrLocation } from 'react-icons/gr';
import { Input, Tree } from 'antd';
const { Search } = Input;

const ShipmentTab = () => {
  const [searchItem, setSearchItem] = useState('');

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const csvData =
        [{
            "TrailerNo": 100,
            "DropNo": 1,
            "Container": 1,
            "ContainerNo": 60,
            "Item": 2,
            "ItemNo":
                [
                    {
                        "id": 0,
                        "item": 10
                    },

                    {
                        "id": 1,
                        "item": 11
                    }
                   
                ]
        },
        {
            "TrailerNo": 101,
            "DropNo": 1,
            "Container": 1,
            "ContainerNo": 70,
            "Item": 2,
            "ItemNo":
                [
                    {
                        "id": 0,
                        "item": 20
                    },

                    {
                        "id": 1,
                        "item": 21
                    }
                   
                ]
        }
    ]


    const displayData =  csvData
        .map(
            (data, id) => {

                var trailer = `Trailer No ${data.TrailerNo}`;
                var drop = `Drop No ${data.DropNo}`;
                var container = `Container No ${data.ContainerNo}`;
                var itemno = data.ItemNo;
                if (searchItem === trailer) {
                  trailer = `.....Trailer No ${data.TrailerNo}.........`;
                }
                if (searchItem === drop) {
                  drop = `............Drop No ${data.DropNo}............`;
                }
                if (searchItem === container) {
                  container = `........Container No ${data.ContainerNo}.......`;
                }

                return (
                    {
                        title: `${trailer}`,
                        key: id,
                        icon: <FiTruck />,
                        children: [
                            {
                                title: `${drop}`,
                                // key: "0-0-0",
                                icon: <GrLocation />,
                                children: [
                                    {
                                        title: `${[container]}`,
                                        // key: '0-0-0-0',
                                        icon: <CgMenuBoxed />,
                                        children:

                                            (data.ItemNo).map((user) => {
                                                var item = `Item ${user.item}`
                                                if(searchItem === item){item = `.....Item No ${user.item}.........` }
                                                return(
                                                    {                                                   
                                                        title: `${item}`,
                                                        // key: user.id,
                                                        icon: <BsBoxSeam />,
                                                    }    
                                                )                                                                                                         
                                            })                                   
                                    },
                                ],
                            }
                        ]
                    }
                )
            }
        )

        const onChange = (e) => {
            const { value } = e.target;
            setSearchItem(value)
           
        }

          

    return (
        <div>
            <Search
                style={{
                    marginBottom: 10,
                }}
                placeholder="Search"
                onChange={onChange}
            />
            <Tree             
                showLine={true}
                showIcon={true}
                onSelect={onSelect}
                treeData={displayData}
                showLeafIcon={true}
            />
        </div>
    );
};

export default ShipmentTab;




















// const dig = () => {
//     const list = [];
  
//     for (let i = 0; i < csvData[0].ItemNo.length; i += 1) {
//       const treeNode = {
//         title: "`${csvData[0].ItemNo.item}`",
//         key: Math.random()
//       };
  
      
//       list.push(treeNode);
//     }
  
//     return list;
//   };
  
//   const treeData = dig();
//   console.log(treeData);


// const [csvDataa, setCsvData] = useState([{}])

//     const fetchCsvData = async () => {
//         try {
//             const response = await fetch('/shipmentcsvdata');
//             const json = await response.json();
//             setCsvData(json)
//             console.log(json);

//         } catch (error) {
//             console.log("error", error);
//         }
//     };

//     useEffect(() => {
//         fetchCsvData();
//     }, []);


// title: `${data.ItemNo[0].item}`,

                                            // <ul>

                                            //     {data.ItemNo.map(ItemNo => (

                                            //         <li >
                                            //             title:  `${ItemNo.item}`
                                            //         </li>

                                            //     ))}

                                            // </ul>


  
                                            
                                            // for (let i = 0; i < data.itemNo.length; i++){
                                 
                                                        // {                                                   
                                                        //      title: `${data.ItemNo[0].item}`,
                                                        //     // key: user.id,
                                                        //     icon: <BsBoxSeam />,
                                                        // }  
                                                    // }
                                                   

                                            


//                                             const treeDataa = [
//     {
//         title: 'Trailer-100',
//         key: '0-0',
//         icon: <FiTruck />,
//         children: [
//             {
//                 title: 'DropNo-1',
//                 key: '0-0-0',
//                 icon: <GrLocation />,
//                 children: [
//                     {
//                         title: 'Container-1',
//                         key: '0-0-0-0',
//                         icon: <CgMenuBoxed />,
//                         children: [
//                             {
//                                 title: 'Item-10',
//                                 key: '0-0-0-0-0',
//                                 icon: <BsBoxSeam />,
//                             },
//                             {
//                                 title: 'Item-11',
//                                 key: '0-0-0-0-1',
//                                 icon: <BsBoxSeam />,
//                             }
//                         ],
//                     },

//                 ],
//             },
//             {
//                 title: 'DropNo-2',
//                 key: '0-0-1',
//                 icon: <GrLocation />,
//                 children: [
//                     {
//                         title: 'Container-1',
//                         key: '0-0-1-0',
//                         icon: <CgMenuBoxed />,
//                         children: [
//                             {
//                                 title: 'Item-13',
//                                 key: '0-0-1-0-0',
//                                 icon: <BsBoxSeam />,
//                             },
//                             {
//                                 title: 'Item-14',
//                                 key: '0-0-1-0-1',
//                                 icon: <BsBoxSeam />,
//                             }
//                         ],
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: 'Trailer-101',
//         key: '0-1',
//         icon: <FiTruck />,
//         children: [
//             {
//                 title: 'DropNo-1',
//                 key: '0-1-0',
//                 icon: <GrLocation />,
//                 children: [
//                     {
//                         title: 'Container-1',
//                         key: '0-1-0-0',
//                         icon: <CgMenuBoxed />,
//                     }
//                 ],
//             },
//         ],
//     },
// ];




// import React from 'react';

// import TreeView from 'devextreme-react/tree-view';
// import SelectBox from 'devextreme-react/select-box';
 // import 'devextreme/dist/css/dx.light.css';
 // import { products } from './data.js';

//  const products = [{
//     id: '1',
//     text: 'Stores',
//     expanded: true,
//     items: [{
//       id: '1_1',
//       text: 'Super Mart of the West',
//       expanded: true,
//       items: [{
//         id: '1_1_1',
//         text: 'Video Players',
//         items: [{
//           id: '1_1_1_1',
//           text: 'HD Video Player',
//           price: 220,
//         }, {
//           id: '1_1_1_2',
//           text: 'SuperHD Video Player',
//           price: 270,
//         }],
//       }, {
//         id: '1_1_2',
//         text: 'Televisions',
//         items: [{
//           id: '1_1_2_1',
//           text: 'SuperLCD 42',
//           price: 1200,
//         }, {
//           id: '1_1_2_2',
//           text: 'SuperLED 42',
//           price: 1450,
//         }, {
//           id: '1_1_2_3',
//           text: 'SuperLED 50',
//           price: 1600,
//         }, {
//           id: '1_1_2_4',
//           text: 'SuperLCD 55',
//           price: 1350,
//         }, {
//           id: '1_1_2_5',
//           text: 'SuperLCD 70',
//           price: 4000,
//         }],
//       }, {
//         id: '1_1_3',
//         text: 'Monitors',
//         items: [{
//           id: '1_1_3_1',
//           text: '19"',
//           items: [{
//             id: '1_1_3_1_1',
//             text: 'DesktopLCD 19',
//             price: 160,
//           }],
//         }, {
//           id: '1_1_3_2',
//           text: '21"',
//           items: [{
//             id: '1_1_3_2_1',
//             text: 'DesktopLCD 21',
//             price: 170,
//           }, {
//             id: '1_1_3_2_2',
//             text: 'DesktopLED 21',
//             price: 175,
//           }],
//         }],
//       }, {
//         id: '1_1_4',
//         text: 'Projectors',
//         items: [{
//           id: '1_1_4_1',
//           text: 'Projector Plus',
//           price: 550,
//         }, {
//           id: '1_1_4_2',
//           text: 'Projector PlusHD',
//           price: 750,
//         }],
//       }],
//   }],
//   }];
  



// const options = ['contains', 'startswith', 'equals'];

// class ShipmentTab extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       value: 'contains',
//     };
//     this.valueChanged = this.valueChanged.bind(this);
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <TreeView
//           id="treeview"
//           items={products}
//           width={500}
//           searchMode={this.state.value}
//           searchEnabled={true}
//         />
//         <div className="options">
//           <div className="caption">Options</div>
//           <div className="option">
//             <span>Search mode</span>
//             <SelectBox
//               items={options}
//               value={this.state.value}
//               onValueChanged={this.valueChanged}
//             />
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }

//   valueChanged(e) {
//     this.setState({ value: e.value });
//   }
// }

// export default ShipmentTab;

