const connection = require("../database/connection");

let createNewTrain = (train) => {

    return new Promise((resolve, reject) => {

        try {

            let data = {
                Name: train.name,
                Seat_Available: train.seatavailable,
                Current_Station: train.currentStation,
                Train_Status: train.trainStatus,
                Station_ID: train.stationid,
                Route_No: train.routeno,
                EndStationID: train.endstationid
            }



            // console.log(data);
            connection.query(
                `INSERT INTO Train set ?`,
                data,
                (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    else {
                        resolve("Created a new Route");
                    }
                }

            )

        }
        catch (e) {
            console.log("Inside error of create Route service / new route");
            reject(e);
        }
    })
}
exports = module.exports = {
    createNewTrain
}







