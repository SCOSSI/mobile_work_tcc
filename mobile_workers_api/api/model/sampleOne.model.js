/**
 * Created by GABRIEL on 29/08/2016.
 */
//require mongoose module
var mongoose = require('mongoose');

//instantiate mongoose schema
var Schema = mongoose.Schema;

//create recipe schema
var sampleOneSchema = new Schema({
    "_id":Number,
    "place":String,
    "placeOther":String,
    "doing":String,
    "isWorkingWithSomeone":String,
    "isWorkingWith":String,
    "isWorkingWithSomeoneOther":String,
    "feeling":String,
    "feelingPositive":String,
    "feelingNegative":String,
    "date":[Date],
    "longitude":String,
    "latitude":String,
    "userEmail":String
});
//export schema
module.exports = mongoose.model('sampleOne', sampleOneSchema);