const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
    id: {type: String,required: true},
    image: {type: String,required: true},
    name: {type: String,required: true},
    description: {type: String,required: true},
    price: {type: String,required: true},
    rating: {type: Number,required: true},
    numRatings: {type: Number,required: true},
    numQuestions: {type: Number,required: true},
    quantityInStock: {type: Number,required: true},
    thumbnail1: {type: String,required: true},
    thumbnail2: {type: String,required: true},
    thumbnail3: {type: String,required: true},

     
}, {
    timestamps: true,
});

const Products = mongoose.model('Product', productSchema);

module.exports = Products;