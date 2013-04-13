
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
 * static methods
 */

productSchema.static('findByOrderId', function (orderId, callback) {
  console.log('finding all products in order #%s', orderId);
  return this.find({ orderId: orderId }, callback);
});

/**
 * model
 */

var Product = mongoose.model('Product', productSchema);

/**
 * Try it out
 */

Product.findByOrderId('my-order-id', function (err, docs) {
  if (err) return done(err);
  console.log('found %d orders', docs.length);
  done();
})
// demonstrate query chaining

function done (err) {
  console.log('done');
  if (err) console.error(err);
  mongoose.disconnect();
}
