/**
 * Created by GABRIEL on 21/07/2016.
 */
//require mongoose model
var mongoose = require('mongoose');

//Instantiate mongoose schema
var Schema = mongoose.Schema;

//create contributor schema
var contributorSchema = new Schema({
    "_id":Number,
    "contributor_name":String,
    "account_status":String
});

//export schema
module.exports = mongoose.model('Contributor', contributorSchema);