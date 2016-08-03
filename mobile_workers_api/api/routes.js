/**
 * Created by GABRIEL on 21/07/2016.
 */

var Geolocation = require('./model/geolocation.model');
var logger = require(__dirname + '/../utils/logger');

/**
 * welcomeAPI()
 * @Request GET
 * Root API route message
 */
exports.welcomeAPI = function (req, res) {
    logger.log('info', 'Recipe API called!');
    res.json({message: 'Welcome to Recipe API!'});
}

exports.createGeolocation = function (req, res) {
    logger.log('info', 'encontrou!');
    Geolocation.create(req.body, function (err, resp) {
        if (err) console.log('Error saving recipe type');
        res.json(resp);
    });

}


