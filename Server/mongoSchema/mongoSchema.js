const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    Company: String,
    Location: String,
    Description: String,
});

const factorySchema = new mongoose.Schema({
    Company: String,
    Factory: String,
    Location: String,
    Description: String,
    identifier: String,
});

const orderSchema = new mongoose.Schema({
    OrderId: String,
    CustomerName: String,
    DeliveryTime: String,
    Address: String,
});

const shipmentSchema = new mongoose.Schema({
    OrderId: String,
    CustomerName: String,
    DeliveryTime: String,
    Address: String,
});

const shipmentCsvSchema = new mongoose.Schema({
    TrailerNo: String,
    DropNo: String,
    Container: String,
    ContainerNo: String,
    Item: String,
    ItemNo: Array
});

const company = new mongoose.model("Company", companySchema);
const factory = new mongoose.model("Factory", factorySchema);

const Order = new mongoose.model("Order", orderSchema);
const Shipment = new mongoose.model("Shipment", shipmentSchema);

const shipmentCsv = new mongoose.model("shipmentCsv", shipmentCsvSchema);



module.exports = {
    company: company,
    factory: factory,
    Order: Order,
    Shipment: Shipment,
    shipmentCsv: shipmentCsv
}