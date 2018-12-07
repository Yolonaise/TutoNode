const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    nom: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 250 },
    price: { type: Number, required: true },
    image: { type: String, required: false, max:500 }
});


// Export the model
module.exports = mongoose.model('product', productSchema);