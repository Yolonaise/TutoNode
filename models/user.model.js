const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    nom: {type: String, required: true, max: 100},
    prenom : {type: String, required: true, max: 250},
    email : {type: String, required: true, max:100},
    password : {type: String, required: true, max:100},
    pseudo : {type : String, required : true, max: 100}
});


// Export the model
module.exports = mongoose.model('user', userSchema);