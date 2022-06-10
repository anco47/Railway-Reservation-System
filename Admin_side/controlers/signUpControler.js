const { validationResult } = require("express-validator");
const registerService = require('../database/registerService');

// for get request
let getSignUpPage = (req, res) => {
    res.render('signUp', {
        errors: req.flash("errors")
    });
}


// for post request
let creatNewUser = async (req, res) => {
    // check validation
    let errorArr = [];
    let validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        let errors = Object.values(validationError.mapped());
        errors.forEach((item) => {
            errorArr.push(item.msg);
        })
        req.flash("errors", errorArr);
        res.redirect('/register');
    }

    // create a new user
    try {
        let newUser = {
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password
        }

        await registerService.creatNewUser(newUser);
        res.redirect('/login');

    } catch (err) {
        req.flash("errors", err);
        res.redirect('/register');
    }

}

exports = module.exports = {
    getSignUpPage,
    creatNewUser
}