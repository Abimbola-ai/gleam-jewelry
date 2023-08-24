const mongoose = require('mongoose'); //For mongodb
const fs = require('fs');

//dotenv configuryion
require('dotenv').config();

//Connect DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established sucessfully');
})


const productSchema = new mongoose.Schema({
    category: {type: String,required: true},
    image: {type: String,required: true},
    name: {type: String,required: true},
    description: {type: String,required: true},
    price: {type: String,required: true},
    rating: {type: Number,required: true},
    numRatings: {type: Number,required: true},
    numQuestions: {type: Number,required: true},
    quantityInStock: {type: Number,required: true},
    thumbnails: [
      {
        label: {type: String,required: true},
        url: {type: String,required: true}
      }
    ]
    
});

const Product = mongoose.model('Product', productSchema);
const rawData =fs.readFileSync("public/json/products.json");
const products_data = JSON.parse(rawData);
//Insert each product into the collection
async function insertProducts(){
  try {
    for (const productData of products_data) {
      const product = new Product(productData);
      await product.save();
    }
    console.log("Products inserted successfully.")
  } catch (error){
    console.log("Error Inserting products:", error)
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from database successfully");
  }
}

insertProducts();