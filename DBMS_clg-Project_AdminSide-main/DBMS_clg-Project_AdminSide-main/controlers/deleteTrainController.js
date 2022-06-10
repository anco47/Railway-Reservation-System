const connection = require("../database/connection");



function deleteTrain(req) {

    const id = req.params.id;

    return new Promise((resolve, reject) => {
        connection.query(
            `
            DELETE FROM Train WHERE Train_No = ${id}
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

function getDeleteTrain(req, res) {
    deleteTrain(req)
        .then(() => {
            console.log("successfully deleted");
            res.redirect('/addTrain');
            return;
        })
        .catch((err) => {
            res.redirect('/');
            console.log(err);
        })
}




exports = module.exports = {
    getDeleteTrain
}