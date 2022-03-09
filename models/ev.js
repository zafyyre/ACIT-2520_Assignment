// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const evSchema = new Schema({
    Country: {
        type: String,
        required: true
    },
    Sales: {
        type: String,
        required: true
    },
    Year: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Sales", evSchema);
