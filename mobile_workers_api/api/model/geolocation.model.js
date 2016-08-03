/**
 * Created by GABRIEL on 26/07/2016.
 */
//require mongoose module
var mongoose = require('mongoose');

//instantiate mongoose schema
var Schema = mongoose.Schema;

//create recipe schema
var recipeSchema = new Schema({
    "_id":Number,
    "name":String,
    "longitude":String,
    "latitude":String,
    "data":String
});
//export schema
module.exports = mongoose.model('Geolocation', recipeSchema);