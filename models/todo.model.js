const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
    nom: {type: String, required: true, max: 100},
    description: {type: String, required: true, max: 250},
    done : {type: Boolean, required: true},
});


// Export the model
module.exports = mongoose.model('todo', todoSchema);