const { body } = require('express-validator');

// console.log(typeof check

let validateRegister = [

    body('email', 'Invalid Email').isEmail(),

    body('password', 'Password length must be atlease 2 char long').isLength({ min: 2 }),

    body("confirmationPassword", "Password confirmation does not match password").custom((value, { req }) => {
        console.log(value, req.body.password);
        return value === req.body.password
    })

];

exports = module.exports = {
    validateRegister
}