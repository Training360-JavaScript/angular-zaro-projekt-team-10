const address = require('./address.json');
const bill = require('./bill.json');
const category = require('./category.json');
const customer = require('./customer.json');
const order = require('./order.json');
const orderline = require('./order-line.json');
const product = require('./product.json');

module.exports = () => ({
  address,
  bill,
  category,
  customer,
  order,
  orderline,
  product,
});
