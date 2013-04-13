
// https://github.com/mongodb/node-mongodb-native
// npm install mongodb

var mongodb = require('mongodb')

mongodb.connect('mongodb://localhost:27017/workshop', function (err, db) {
  if (err) throw err;

  // get a collection - it doesn't matter if it exists already or not
  var phones = db.collection('cellphones');

  // create an object to insert into the database
  var doc = { type: 'Android', desc: 'Samsung Galaxy S3' };

  // add the document to the cellphones collection in the test database
  phones.insert(doc, function (err) {
    if (err) return done(err);
    console.log('inserted');
    findOne()
  })

  function findOne () {
    console.log('finding a document');
    phones.findOne({ desc: doc.desc }, function (err, doc) {
      if (err) return done(err);
      console.log('found', doc);
      update();
    })
  }

  function update () {
    console.log('updating a document');

    // increment the "purchased" property by one
    phones.update({ _id: doc._id }, { $inc: { purchased: 1 }}, function (err) {
      if (err) return done(err);
      drop();
    })
  }

  function drop () {
    console.log('dropping the phones collection');
    phones.drop(function (err) {
      if (err) return done(err);
      done();
    })
  }

  function done (err) {
    console.log('done');
    if (err) console.error(err);
    db.close();
    process.exit(0)
  }
})

