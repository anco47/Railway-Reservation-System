const connection = require("../database/connection");


let createNewPassThrough = (route) => {

    return new Promise((resolve, reject) => {

        try {
            let data = {
                Route_No: route.Route_No,
                Station_ID: route.Station_ID
            }



            connection.query(
                `INSERT INTO Pass_Through set ?`,
                data,
                (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    else {
                        resolve("Created a new Pass Through");
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
    createNewPassThrough
}



