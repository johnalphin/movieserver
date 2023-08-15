

//mongodb using mongoose library
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://John_admin:wNc16zzmEqYBY6zK@cluster0.kx1yzsn.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true });

//schemathis - can be created everytime a new api is required
const movieschema=new mongoose.Schema
({
name:String,
rating:Number,
review:String
});

//collection - this can be created everytime a new api is required
const Movie = mongoose.model("moviesses",movieschema);

//entry- this code will go into app.post or put, below will be used often.
const data = {
  name:"Sashank Redemption",
  rating:5,
  review:"good movie"
}
const data1 = {
  name:"Apocalytpo",
  rating:5,
  review:"good movie"
}
const data2 = {
  name:"Shutter Island",
  rating:5,
  review:"good movie"
}
const data3 ={
  name:"Fall",
  rating:5,
  review:"good movies"
}


  // Movie.insertMany([data1,data2,data3]).then(function () {
  //   console.log("Successfully saved defult items to DB");
  // }).catch(function (err) {
  //   console.log(err);
  // });



//for saving above data
// data.save();



//mongodb using native driver 
// const { MongoClient } = require('mongodb');
// // Connection URL
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);
// // Database Name
// const dbName = 'test2';
// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('movie');
//   // the following code examples can be pasted here...
//   //insert data to document ,if document not available it will be created
//   // const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
//   // console.log('Inserted documents =>', insertResult); 
//   //find all data from the collection varibale name mentioned above
//   const findResult = await collection.find({}).toArray();
//  console.log('Found documents =>', findResult);
//   return 'done.';
// }
// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());





//Express server communication with frontend

const express = require('express')
const bodyParser=require("body-parser")
const cors = require('cors');
const app = express()
const port = 8080
var arr=[]
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
// app.get('/', (req, res) => {
//   res.sendFile(__dirname+'/index.html')
// })
app.post('/data', (req, res) => {
  console.log(req.body.movieName,"body");
  res.send({data:"response from post"});
// arr.push(req.body.num1)
//   res.send({arr:arr});
const data = {
  name:req.body.movieName,
  rating:5,
  review:req.body.movieDesc
}
  
  Movie.insertMany([data]).then(function () {
    console.log("Successfully saved defult items to DB");
  }).catch(function (err) {
    console.log(err);
  });
});


app.get('/data', (req, res) => {
  console.log("dtata",arr)
    Movie.find({})
  .then(movies => {
    console.log(movies[0].name);
     res.send({data:movies});
  })
  .catch(err => {
    console.error(err);
  });
 
})

app.post('/update', (req, res) => {
  console.log(req.body._id,"body");

  
  var id=req.body._id
  console.log(id,"id from front end")
  var name=req.body.name

  Movie.updateOne({ _id: id }, { name: name })
  .then(result => {
    if (result.nModified > 0) {
      console.log('Movie updated successfully');
      res.send({ message: 'Movie updated successfully' });
    } else {
      console.log('No movie found with the provided ID');
      res.send({ message: 'Movie updated successfully' });
      // res.status(404).send({ message: 'No movie found with the provided ID' });
    }
  })
  .catch(error => {
    console.error('Error updating movie:', error);
    res.status(500).send({ message: 'An error occurred while updating the movie' });
  });
});

app.delete('/deleteEntry/:id', (req, res) => {
  const entryId = req.params.id;
console.log("id",entryId)
  Movie.deleteOne({ _id: entryId })
    .then(result => {
      if (result.deletedCount > 0) {
        console.log('Movie deleted successfully');
        res.send({ message: 'Movie deleted successfully' });
      } else {
        console.log('No movie found with the provided ID');
        res.status(404).send({ message: 'No movie found with the provided ID' });
      }
    })
    .catch(error => {
      console.error('Error deleting movie:', error);
      res.status(500).send({ message: 'An error occurred while deleting the movie' });
    });
});
