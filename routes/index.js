const express = require("express");
const router = express.Router();
const MongooseStudentModel = require('../models/ev')
const csv2json = require("csvtojson")
const path = require("path")


// list all sales
router.get("/", (req, res, next) => {
    MongooseStudentModel.count(function(err, count) {
        if (count == 0) {
            const filename = path.join(__dirname, "../data/ev_sales_2020.csv")
            csv2json().fromFile(filename).then(data => {
                MongooseStudentModel.collection.insertMany(data, function(err, data) {
                    if (err) res.send(err);
                });
            })
        } else {
            res.send(err)
        }
    })
    res.render("index", {
        title: "EV Sales 2020"
    });
});


module.exports = router;