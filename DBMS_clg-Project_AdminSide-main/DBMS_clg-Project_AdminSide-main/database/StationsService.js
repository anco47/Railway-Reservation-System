const connection = require("../database/connection");


let createNewStation = (user) => {

    return new Promise(async (resolve, reject) => {
        try {

            // check email of new user
            let check = await checkStation(user.nameofstation);

            if (check) {
                reject(`This Station ${user.nameofstation} already exists. `)
            }
            else {
                // hash the user password
                let data = {
                    Name: user.nameofstation,
                    city: user.city
                }

                connection.query(
                    `INSERT INTO Station set ?`,
                    data,
                    (err, rows) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve("Created a new Station Successfully");
                        }
                    }
                )
            }
        }
        catch (e) {
            console.log("Inside Error of create Station service / new station");
            reject(e);
        }
    })
}

let checkStation = (station) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT * FROM Station WHERE Name = ?`,
                station,
                (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    else if (rows.length > 0) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }
            )
        }
        catch (err) {
            reject(err);
        }
    })


}

exports = module.exports = {
    createNewStation
}
