const connection = require("../database/connection");

let createNewRoute = (route) => {

    return new Promise((resolve, reject) => {

        try {

            let data = {
                Length: route.lengthofroute,
                Expected_Time: route.timeofroute
            }



            console.log(data);
            connection.query(
                `INSERT INTO Routes set ?`,
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
    createNewRoute
}



