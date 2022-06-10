const { validationResult } = require("express-validator");
const registerRoute = require('../database/passThroughService');

const connection = require("../database/connection");

function GetAllPassThrough() {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM Pass_Through`,
            (err, rows, col) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            }
        )
    })
}


function showPassThrough(req, res) {
    GetAllPassThrough()
        .then((PassThrough) => {
            res.render('passThrough', { PassThrough, errors: req.flash("errors") });
        })
        .catch((err) => {
            res.send(err);
        })
}

async function createNewPassThrough(req, res) {
    try {
        let newPassThrough = {
            Route_No: req.body.Route_No,
            Station_ID: req.body.Station_ID,
        }
        await registerRoute.createNewPassThrough(newPassThrough);
        res.redirect('/addpassThrough');
    }
    catch (err) {
        req.flash("errors", err);
        res.redirect('/addpassThrough');
    }
}




exports = module.exports = {
    showPassThrough,
    createNewPassThrough
}