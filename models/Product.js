const mongoose  = require("mongoose");

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
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;