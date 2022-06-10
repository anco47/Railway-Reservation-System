const { body } = require('express-validator');

let authStationValidation = [

    body('nameofstation', 'Invalid entry of Station').isLength({ min: 1 }),

    body('city', 'Invalid entry of city').isLength({ min: 1 }),

];

exports = module.exports = {
    authStationValidation
}