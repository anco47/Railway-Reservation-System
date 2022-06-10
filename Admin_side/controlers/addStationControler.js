const { validationResult } = require("express-validator");
const registerService = require('../database/StationsService');

const connection = require("../database/connection");


function GetAllStations() {

    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM Station`,
            (err, rows, cols) => {
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

function showStations(req, res) {
    GetAllStations()
        .then((stations) => {
            res.render('stations', { stations, errors: req.flash("errors") });
        })
        .catch((err) => {
            res.send(err);
        })
}

let createNewStation = async (req, res) => {
    let errorArr = [];
    let validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        let errors = Object.values(validationError.mapped());
        errors.forEach((item) => {
            errorArr.push(item.msg);
        })

        req.flash("errors", errorArr);
        res.redirect('/addStations');
    }
    else {
        // create a new user
        try {
            let newStation = {
                nameofstation: req.body.nameofstation,
                city: req.body.city
            }

            await registerService.createNewStation(newStation);
            res.redirect('/addStations');

        } catch (err) {
            req.flash("errors", err);
            res.redirect('/addStations');
        }
    }
}

exports = module.exports = {
    createNewStation,
    showStations
}