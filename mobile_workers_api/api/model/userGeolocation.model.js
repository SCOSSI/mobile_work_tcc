/**
 * Created by GABRIEL on 29/08/2016.
 */


//require mongoose module
var mongoose = require('mongoose');

//instantiate mongoose schema
var Schema = mongoose.Schema;

//create recipe schema
var userGeolocationSchema = new Schema({
    "_id":Number,
    "date":[Date],
    "longitude":String,
    "latitude":String,
    "userEmail":String
});
//export schema
module.exports = mongoose.model('userGeolocation', userGeolocationSchema);