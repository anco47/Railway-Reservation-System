const connection = require("../database/connection");


const bcrypt = require('bcryptjs');

let findUserByEmail = (email) => {

    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT * FROM admin WHERE email = ?`,
                email,
                (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        let user = rows[0];
                        resolve(user);
                    }

                }
            )
        }
        catch (err) {
            reject(err);
        }
    })


}


let comparePasswordUser = (user, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isMatch = await bcrypt.compare(password, user.password);
            console.log(password, user.password);
            if (isMatch) resolve(true);
            else resolve("The Password you have entered is incorrect");
        }
        catch (err) {
            reject(err);
        }
    })
}

let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(
                `SELECT * FROM admin WHERE id = ?`,
                id,
                (err, rows) => {
                    if (err) reject(err);
                    let user = rows[0];
                    resolve(user);
                }
            )
        }
        catch (err) {
            if (err) reject(err);
        }
    })

}

exports = module.exports = {
    findUserByEmail,
    comparePasswordUser,
    findUserById
}
