const { validationResult } = require("express-validator");
const registerRoute = require('../database/RouteService');

const connection = require("../database/connection");



function GetAllRoute() {
    return new Promise((resolve, reject) => {
        // console.log("HI");
        connection.query(
            `SELECT * FROM Routes`,
            (err, rows, col) => {
                if (err) {
                    reject(err);
                }
                else {
                    // console.log("HI");
                    resolve(rows);
                }
            }
        )
    })
}

function showRoutes(req, res) {
    GetAllRoute()
        .then((stations) => {
            res.render('routes', { stations, errors: req.flash("errors") });
        })
        .catch((err) => {
            res.send(err);
        })
}

async function createNewRoute(req, res) {

    let errorArr = [];
    let validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        let errors = Object.values(validationError.mapped());
        errors.forEach((item) => {
            errorArr.push(item.msg);
        })
        req, flash("errors", errorArr);
        res.redirect('/addRoute');
    }
    else {
        // create a new route
        try {
            let newRoute = {
                lengthofroute: req.body.lengthofroute,
                timeofroute: req.body.timeofroute,
            }
            console.log(newRoute);
            await registerRoute.createNewRoute(newRoute);
            res.redirect('/addRoute');
        }
        catch (err) {
            req.flash("errors", err);
            res.redirect('/addRoute');
        }

    }

}

exports = module.exports = {
    showRoutes,
    createNewRoute
}





