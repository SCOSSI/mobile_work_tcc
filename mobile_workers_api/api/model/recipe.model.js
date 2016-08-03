//require mongoose module
var mongoose = require('mongoose');

//instantiate mongoose schema
var Schema = mongoose.Schema;

//create recipe schema
var recipeSchema = new Schema({
    "_id":Number,
    "name":String,
    "title":String,
    "prep_time":String,
    "total_time":String,
    "difficulty":String,
    "recipe":String,
    "recipe_type":Number,
    "tag_words":String,
    "contributor":Number,
    "stars":Number
});
//export schema
module.exports = mongoose.model('Recipe', recipeSchema);