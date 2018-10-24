const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let apiSchema = new Schema({
    key: {type: String, required: true, max: 100},
    applicationName: {type: String, required: true, max: 250},
    userId: {type: String, required: true}
});


// Export the model
module.exports = mongoose.model('apiKey', apiSchema);