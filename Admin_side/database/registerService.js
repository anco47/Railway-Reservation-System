

const bcryptjs = require('bcryptjs');
const connection = require("../database/connection");


let creatNewUser = (user) => {

    return new Promise(async (resolve, reject) => {
        try {

            // check email of new user
            let check = await checkEmailUser(user.email);

            if (check) {
                reject(`This email ${user.email} already exists. Please choose another email.`)
            }
            else {
                // hash the user password
                let salt = bcryptjs.genSaltSync(10);
                let data = {
                    fullname: user.fullname,
                    email: user.email,
                    password: bcryptjs.hashSync(user.password, salt)
                }

                connection.query(
                    `INSERT INTO admin set ?`,
                    data,
                    (err, rows) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve("Created a new user Successfully");
                        }
                    }
                )
            }
        }
        catch (e) {

        }
    })
}

let checkEmailUser = (email) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT * FROM admin WHERE email = ?`,
                email,
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
    creatNewUser
}