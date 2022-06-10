const connection = require("../database/connection");


function seeList(req) {
    let id = req.params.id;
    return new Promise((resolve, reject) => {
        connection.query(
            `
            SELECT * FROM Tickets
            WHERE TrainId = '${id}';
            `,
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


function passengerList(req, res) {
    seeList(req)
        .then((passenger) => {
            console.log(passenger);
            passenger.forEach(element => {
                element.DateOfBoarding = JSON.stringify(element.DateOfBoarding).substring(1, 11);
            });
            res.render('passenger', { passenger });
            return;
        })
        .catch((err) => {
            res.send(err);
            res.redirect('/addTrain');
        })
}


exports = module.exports = {
    passengerList
}













