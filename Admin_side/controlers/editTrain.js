// 
const connection = require("../database/connection");


function GetTrainData(req) {
    console.log("GetTrainData");
    const id = req.params.id;
    console.log(id);
    console.log("========================");
    return new Promise((resolve, reject) => {
        connection.query(
            `
            SELECT * FROM Train
            WHERE Train_No = "${id}" 
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


function GetEditForm(req, res) {
    // console.log("here");
    // res.render('editTrain');
    console.log("GetEditForm");
    console.log(req.params.id);
    console.log("==============");
    GetTrainData(req)
        .then((trains) => {
            console.log(req.params.id)
            let id = req.params.id
            res.render('editTrain', { trains, id });
            // return;
        })
        .catch((err) => {
            res.send(err);
        })
}

function editTrain(req) {
    console.log("editTrain");
    let id = req.params.id;
    console.log("===================");
    // console.log(id);
    let newParam = {
        name: req.body.nameoftrain,
        seatavailable: req.body.seatavailable,
        currentStation: req.body.currentStation,
        trainStatus: req.body.trainStatus,
        stationid: req.body.stationid,
        routeno: req.body.routeno,
        endstationid: req.body.endstationid
    };
    return new Promise((resolve, reject) => {
        connection.query(
            `
            UPDATE Train
            SET Name = "${newParam.name}", Seat_Available = "${newParam.seatavailable}", Current_Station = "${newParam.currentStation}", Train_Status = "${newParam.trainStatus}", Station_ID = "${newParam.stationid}", Route_No = "${newParam.routeno}", EndStationID = "${newParam.endstationid}"
            WHERE Train_No = "${id}"
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

function updateTrain(req, res) {
    // console.log(req.params.id);
    // res.redirect('/addTrain');
    // return;
    console.log("updateTrain");
    console.log(req.params.id);
    console.log("================");
    editTrain(req)
        .then(() => {
            console.log("Successfully Updated");
            res.redirect('/addTrain');
            return;
        })
        .catch((err) => {
            res.redirect('/');
            console.log(err);
        })

}

exports = module.exports = {
    GetEditForm,
    updateTrain
}