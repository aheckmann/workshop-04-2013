
// npm install mongoose

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var updatedPlugin = require('./updatedPlugin');

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
 * add plugin
 */

productSchema.plugin(updatedPlugin);

/**
 * model
 */

var Product = mongoose.model('Product', productSchema);

/**
 * document
 */

var soda = new Product({ name: 'Yum Yum Ginger Ale' })

soda.save(function (err) {
  if (err) return done(err);
  console.log('created', soda);
  done();
})

function done (err) {
  console.log('done');
  if (err) console.error(err);
  mongoose.disconnect();
}
