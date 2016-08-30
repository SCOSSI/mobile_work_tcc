/**
 * Created by GABRIEL on 21/07/2016.
 */

var userGeolocation = require('./model/userGeolocation.model');
var user = require('./model/user.model');
var sampleOne = require('./model/sampleOne.model');
var sampleTwo = require('./model/sampleTwo.model');
var sampleThree = require('./model/sampleThree.model');
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

exports.addUserGeolocation = function (req, res) {
    logger.log('info', 'addUserGeolocation called!');
    userGeolocation.create(req.body, function (err, resp) {
        if (err) console.log('Error saving addUserGeolocation');
        res.json(resp);
    });

}

exports.addSampleOne = function (req, res) {
    logger.log('info', 'addSampleOne called!');
    sampleOne.create(req.body, function (err, resp) {
        if (err) console.log('Error saving addSampleOne');
        res.json(resp);
    });

}

exports.addSampleTwo = function (req, res) {
    logger.log('info', 'addSampleTwo called!');
    sampleTwo.create(req.body, function (err, resp) {
        if (err) console.log('Error saving addSampleTwo');
        res.json(resp);
    });

}

exports.addSampleThree = function (req, res) {
    logger.log('info', 'addSampleThree called!');
    sampleThree.create(req.body, function (err, resp) {
        if (err) console.log('Error saving addSampleThree');
        res.json(resp);
    });

}



exports.addUser = function (req, res) {
    logger.log('info', 'addUser called!');
    user.create(req.body, function (err, resp) {
        if (err) console.log('Error saving addUser');
        res.json(resp);
    });
}
exports.test = function (req, res) {
    console.log(req.body);
    

}


