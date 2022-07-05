const express = require('express')
const fs = require('fs');
const parse = require('csv-parser');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true, }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(require('./router/auth'));
// require('./customers/dbConn')
const con = require("./sqlServer")
var dateTime = require('node-datetime');
// require('./Company/conn')
require('./OrderShipment/Conn')
const {company, factory, Order, Shipment, shipmentCsv} = require('./mongoSchema/mongoSchema');



//Shipment csv parsing data

app.get('/shipmentCsv', (req, res) => {
  const shipmentCsvData = [];

  fs.createReadStream('shipment.csv')
    .pipe(parse({}))
    .on('data', (csvfile) => {
      shipmentCsvData.push(csvfile);
     
    })
    .on('end', () => {
      console.log(shipmentCsvData);
      // shipmentCsv.insertMany(shipmentCsvData)
    });
});


app.get("/shipmentCsvData", (req, res) => {
  const getDocument = async () => {
    try {
      const result = await shipmentCsv.find();
      res.send(result);
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  getDocument();
});


//orders data operation

app.get("/orders", (req, res) => {
  const getDocument = async () => {
    try {
      const result = await Order.find();
      res.send(result);
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  getDocument();
});


app.get(`/viewOrderData/:id`, (req, res) => {
  const id = req.params.id;
  console.log(id)
  const getDocument = async () => {
    try {
      const result = await Order.find({ OrderId: id })
      res.send(result);
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  getDocument();
});


app.get(`/orders/:values`, (req, res) => {
  const dateRange = req.params.values;
  const startDate = dateRange.substring(0, 8);
  const endDate = dateRange.substring(9, 17)
  const getDocument = async () => {
    try {
      const result = await Order.find({
        DeliveryTime: {
          $gte: (startDate),
          $lt: (endDate)
        }
      })
      res.send(result);
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  getDocument();
});

let ordersData = [];
app.post('/addOrdersData', function (req, res) {
  ordersData = req.body;
  var date = dateTime.create().format('y-m-d H:M:S');
  // console.log(ordersData)

  const createDocument = async () => {
    try {
      const user = new Order({
        OrderId: ordersData[0],
        CustomerName: ordersData[1],
        DeliveryTime: date,
        Address: ordersData[2],

      });

      const result = await user.save();
    } catch (err) {
      console.log(err);
    }
  };

  createDocument();

  var jsonTemplate = {
    OrderId: ordersData[0],
    CustomerName: ordersData[1],
    Address: ordersData[2],
    ShipmentNo: ordersData[3],
    CompanyName: ordersData[4],
    TrailerNo: ordersData[5],
    TenantId: ordersData[6],
    TenantName: ordersData[7],
    DeliveryDate: ordersData[8],

  }
  console.log(jsonTemplate);

  fs.readFile(`${__dirname}/tempelate.json`, 'utf-8', function (err, data) {
    var json = JSON.parse(data)
    json.push(jsonTemplate)

    fs.writeFile(`${__dirname}/tempelate.json`, JSON.stringify(json), (err) => {
      console.log("file appended")
    })
    // console.log(JSON.stringify(json));
  })
});


//shipments data operation

app.get("/shipment", (req, res) => {
  const getDocument = async () => {
    try {
      const result = await Shipment.find();
      res.send(result);
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  getDocument();
});

app.get(`/shipment/:values`, (req, res) => {
  const dateRange = req.params.values;
  const startDate = dateRange.substring(0, 8);
  const endDate = dateRange.substring(9, 17)
  const getDocument = async () => {
    try {
      const result = await Shipment.find({
        DeliveryTime: {
          $gte: (startDate),
          $lt: (endDate)
        }
      })
      res.send(result);
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  getDocument();
});


let shipmentData = [];
app.post('/addShipmentData', function (req, res) {
  shipmentData = req.body;
  var date = dateTime.create().format('y-m-d H:M:S');
  // console.log(shipmentData)

  const createDocument = async () => {
    try {
      const user = new Shipment({
        OrderId: shipmentData[0],
        CustomerName: shipmentData[1],
        DeliveryTime: date,
        Address: shipmentData[2],
      });

      const result = await user.save();
      // const Employee = await reactComment.insertMany([reactc,reactd])

      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  createDocument();
});

//factory data operation

app.get("/factory", (req, res) => {
  const getDocument = async () => {
    try {
      const result = await factory.find();
      res.send(result);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  getDocument();
});

app.get("/viewData/:company", (req, res) => {
  const company = req.params.company;
  const getDocument = async () => {
    try {
      const result = await factory.find({ "Company": `${company}` });
      res.send(result);
      // console.log(result);
      console.log(company)
    } catch (err) {
      console.log(err);
    }
  };

  getDocument();
});


let factoryData = [];
app.post('/addFactoryData', function (req, res) {
  factoryData = req.body;
  console.log(factoryData)

  const createDocument = async () => {
    try {
      const user = new factory({
        Factory: factoryData[0],
        Location: factoryData[1],
        Description: factoryData[2],
        Company: factoryData[3],
      });

      const result = await user.save();
      // const Employee = await reactComment.insertMany([reactc,reactd])

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  createDocument();
});

app.put("/editFactoryData", (req, res) => {
  console.log(req.body)
  const factoryy = req.body[0];
  const location = req.body[1];
  const description = req.body[2];
  const id = req.body[3];
  const updateDocument = async (id) => {
    try {
      const result = await factory.updateOne(
        { _id: id },
        {
          $set: {
            Factory: factoryy,
            Location: location,
            Description: description,
          },
        }
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  updateDocument(id);
});

app.delete("/deleteFactory/:identifier", (req, res) => {
  const id = req.params.identifier;

  const deleteDocument = async (_id) => {
    try {
      const result = await factory.deleteOne({ _id }); //we can use .findByIdAndDelete({_id})

    } catch (err) {
      console.log(err);
    }
  };

  deleteDocument(id);
});





//Company Data operation

app.get("/company", (req, res) => {
  const getDocument = async () => {
    try {
      const result = await company.find();
      res.send(result);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  getDocument();
});


let companyData = [];
app.post('/addCompanyData', function (req, res) {
  companyData = req.body;
  console.log(companyData)

  const createDocument = async () => {
    try {
      const user = new company({
        Company: companyData[0],
        Location: companyData[1],
        Description: companyData[2],
      });

      const result = await user.save();
      // const Employee = await reactComment.insertMany([reactc,reactd])

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  createDocument();
});

app.put("/editCompanyData", (req, res) => {
  console.log(req.body)
  const companyy = req.body[0];
  const location = req.body[1];
  const description = req.body[2];
  const id = req.body[3];
  const updateDocument = async (id) => {
    try {
      const result = await company.updateOne(
        { _id: id },
        {
          $set: {
            Company: companyy,
            Location: location,
            Description: description,
          },
        }
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  updateDocument(id);
});

app.delete("/deleteCompany/:identifier", (req, res) => {
  const id = req.params.identifier;

  const deleteDocument = async (_id) => {
    try {
      const result = await company.deleteOne({ _id }); //we can use .findByIdAndDelete({_id})

    } catch (err) {
      console.log(err);
    }
  };

  deleteDocument(id);
});



//Database operation//

let range = [];
var searchquery;

app.post('/search', function (req, res) {
  range = req.body;
  if (range[0] === null || range[0] === undefined || range[1] === null || range[1] === undefined) { searchquery = `SELECT * FROM customers WHERE AGE BETWEEN ${0} and ${0}` }
  else {
    searchquery = `SELECT * FROM customers WHERE AGE BETWEEN ${range[0]} AND ${range[1]}`
  }

});
let data = [];
app.post('/addData', function (req, res) {
  var date = dateTime.create().format('d-m-y H:M:S');
  data = req.body;
  console.log(data)

  //sql
  var addDataQuery = `INSERT INTO customers (NAME, AGE, ID, CreatedAt) VALUES ('${data[0]}', '${data[1]}',${data[2]}, "${date}")`
  console.log(addDataQuery)

  con.query(addDataQuery, (err, result) => {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
    res.json(
      result
    );
  });
  //mongoDb
  const createDocument = async () => {
    try {
      const newcst2 = new customers({
        Name: data[0],
        Age: data[1],
        Id: data[2],
      });
      // const result = await reactComment.save();
      const result = await customers.insertMany([newcst2]);
      console.log(result);
    }
    catch (err) {
      console.log(err)
    }
  }
  createDocument();


});


app.post("/editData", (req, res) => {
  var date = dateTime.create().format('d-m-y H:M:S');
  const oldId = req.body[3]
  const id = req.body[2]
  const age = req.body[1];
  const name = req.body[0];

  //sql
  con.query("UPDATE customers SET name =?, age=?, id=?, CreatedAt=? where id = ? ", [name, age, id, date, oldId], (err) => {
    console.log(err);
  });
  console.log(name, age, id, oldId)

  //mongoDb
  const updateDocument = async (id) => {
    try {
      // const result = await Employee.updateOne({id}, {
      const result = await customers.find({ id }, {
        $set: { Name: name, Age: age, Id: id }
      }, {
        new: true,
        useFindAndModify: false
      }
      )
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }
  // updateDocument(oldId);

});

app.delete("/deleteData/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  //sql
  con.query("DELETE FROM customers where id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });

  //mongoDb

  const deleteDocument = async (id) => {
    try {
      // const result = await Employee.deleteOne({id});
      const result = await customers.findAndDelete({ id });
      console.log(result);
    } catch (err) { console.log(err); }
  }


  // deleteDocument(id);
});

app.get('/api', (req, res) => {

  const csvData = [];
  var sqldata;


  fs.createReadStream('database.csv')
    .pipe(parse({}))
    .on('data', (csvfile) => {
      csvData.push(csvfile);
      sqldata = csvData.map(item => `("${item.NAME}","${item.AGE}",${item.ID})`);

    })
    .on('end', () => {

      // console.log(csvData);

      finalQuery = "INSERT INTO customers (NAME, AGE, ID) VALUES " + sqldata
      const createTable = "CREATE TABLE customers (NAME varchar(255), AGE varchar(255), ID int)";
      const select = "SELECT * from customers";
      const insertData1 = "INSERT INTO customers (NAME, AGE, ID) VALUES ('Manish Kumar', '26',1),('Satish Kumar', '25',2),('Lionel Messi', '31',3),('Andres verma', '34',4)"
      const truncate = "TRUNCATE table customers"
      const alterColumn = `alter table customers modify CreatedAt varchar(40) DEFAULT (${new Date()})`
      // console.log(finalQuery)
      //sql
      var sql = searchquery;
      // console.log(range)
      // console.log(finalQuery)
      con.query(sql, (err, result) => {
        if (err) throw err;
        // console.log("Result: " + JSON.stringify(result));
        res.json(
          result
        );
      });

      //mongoDb
      const getDocument = async () => {
        const result = await customers
          .find()
        console.log(result)
      }
      // getDocument()



    });
})

const port = process.env.port || 8000;
app.listen(port, () => {
  console.log("server running at 8000")
});




