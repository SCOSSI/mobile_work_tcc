/**
 * Created by GABRIEL on 29/08/2016.
 */

//require mongoose module
var mongoose = require('mongoose');

//instantiate mongoose schema
var Schema = mongoose.Schema;

//create recipe schema
var sampleThreeSchema = new Schema({
    "_id":Number,
    "sharedInformation":String,
    "whoWithSharedInformation":String,
    "informationPersonNeeded":String,
    "communicationToolUsed":String,
    "personWhoGaveInformation":String,
    "communicationToolUsed":String,
    "communicationToolUsedOther":String,
    "date":[Date],
    "longitude":String,
    "latitude":String,
    "userEmail":String
});
//export schema
module.exports = mongoose.model('sampleThree', sampleThreeSchema);