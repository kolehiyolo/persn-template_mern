const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect('mongodb://0.0.0.0:27017/connect_co', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.clear();
  console.log("We're connected!");

  const collections = ['projects', 'tasks', 'users'];
  const jsonFiles = [
    'data/JSON/connect_co.projects.json', 
    'data/JSON/connect_co.tasks.json', 
    'data/JSON/connect_co.users.json'
  ];

  collections.forEach((collection, index) => {
    // Delete all documents from the collection
    mongoose.connection.collection(collection).deleteMany({}, function(err, result) {
      if (err) throw err;
      console.log(`Deleted all documents from ${collection}`);

      // // Read the JSON file
      // fs.readFile(jsonFiles[index], 'utf8', function(err, data) {
      //   if (err) throw err;
      //   const jsonData = JSON.parse(data);

      //   // Insert the JSON data into the collection
      //   mongoose.connection.collection(collection).insertMany(jsonData, function(err, result) {
      //     if (err) throw err;
      //     console.log(`Inserted data into ${collection}`);
      //   });
      // });
      
// Read the JSON file
fs.readFile(jsonFiles[index], 'utf8', function(err, data) {
  if (err) throw err;
  let jsonData = JSON.parse(data);

  // Convert _id fields
  jsonData = jsonData.map(item => {
    if (item._id && item._id.$oid) {
      return { ...item, _id: new mongoose.Types.ObjectId(item._id.$oid) };
    }
    return item;
  });

  // Insert the JSON data into the collection
  mongoose.connection.collection(collection).insertMany(jsonData, function(err, result) {
    if (err) throw err;
    console.log(`Inserted data into ${collection}`);
  });
});
    });
  });
});