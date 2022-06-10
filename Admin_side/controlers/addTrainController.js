const { validationResult } = require("express-validator");
const registerRoute = require('../database/trainService');

const connection = require("../database/connection");


function GetAllTrain() {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM Train`,
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

function showTrains(req, res) {
    GetAllTrain()
        .then((train) => {
            res.render('Train', { Trains: train, errors: req.flash("errors") });
        })
        .catch((err) => {
            res.send(err);
        })
}

async function createNewTrain(req, res) {

    try {
        let newTrain = {
            name: req.body.nameoftrain,
            seatavailable: req.body.seatavailable,
            currentStation: req.body.currentStation,
            trainStatus: req.body.trainStatus,
            stationid: req.body.stationid,
            routeno: req.body.routeno,
            endstationid: req.body.endstationid
        }
        await registerRoute.createNewTrain(newTrain);
        res.redirect('/addTrain');
    }
    catch {
        req.flash("errors", err);
        res.redirect('/addTrain');
    }
}


exports = module.exports = {
    showTrains,
    createNewTrain
}


