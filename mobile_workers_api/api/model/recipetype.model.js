/**
 * Created by GABRIEL on 21/07/2016.
 */
//require mongoose module
var mongoose = require('mongoose');

//Instantiate mongoose schema
var Schema = mongoose.Schema;

//create recipe type schema
var recipeTypeSchema = new Schema({
    "_id":Number,
    "recipe_type":String
});
//export schema
module.exports = mongoose.model('RecipeType', recipeTypeSchema);