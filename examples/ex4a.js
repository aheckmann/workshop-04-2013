
// npm install mongoose

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * connect to mongodb
 */

mongoose.connect('mongodb://localhost/workshop');

/**
 * schema
 */

var productSchema = Schema({
    name: { type: String, required: true }
  , created: { type: Date, default: Date.now }
})

/**
 * Document methods
 */

productSchema.method('addToOrder', function (orderId, callback) {
  console.log('adding this product to order #%s', orderId);

  var Order = this.model('Order');
  Order.update({ _id: orderId }, { $addToSet: { items: this._id }}, callback);
});

/**
 * model
 */

var Product = mongoose.model('Product', productSchema);

/**
 * Add a quick Order model
 */

mongoose.model('Order', { _id: String, items: [Schema.Types.ObjectId] });

/**
 * document
 */

var soda = new Product({ name: 'Yum Yum Ginger Ale' })
soda.addToOrder('someId', function (err) {
  console.log('soda', soda);
  done(err);
});


function done (err) {
  console.log('done');
  if (err) console.error(err);
  mongoose.disconnect();
}
