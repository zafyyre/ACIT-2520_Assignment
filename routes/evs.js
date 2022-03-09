const express = require("express");
const router = express.Router();

const MongooseStudentModel = require('../models/ev')


// =================== SWAGGER COMPONENT REFERENCE ===================
/**
 * @swagger
 * components:
 *   schemas:
 *     Sale:
 *       type: object
 *       required:
 *         - Country
 *         - Sales
 *         - Year
 *       properties:
 *         _id:
 *           type: string
 *           description: The Auto-generated GUID of a sale
 *         Country:
 *           type: string
 *           description: Country name
 *         Sales:
 *           type: string
 *           description: Sales of a country
 *         Year:
 *           type: string
 *           descripton: Year of all sales
 *
 */

/**
 * @swagger
 * /api/ev:
 *  get:
 *      summary: Retrieve a list of sales
 *      tags: [Sales]
 *      description: Used to request all sales
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: A successful response
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Sale'
 */
router.get('/ev', (req, res) => {
    MongooseStudentModel.find({}, (err, data) => {
        if (err) res.send(err);
        res.json(data);
    });
});

/**
 * @swagger
 * /api/ev/{id}:
 *   get:
 *     summary: Retrieve a list of sales
 *     tags: [Sales]
 *     description: Returns a single sale
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Sale's id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single sale by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       400:
 *         description: post can not be found
 */
// get single sale
router.get("/ev/:id", function(req, res, next) {
    MongooseStudentModel.findById(req.params.id, (err, data) => {
        if (err) res.send(err);
        res.json(data);
    });
});


/**
 * @swagger
 * /api/ev:
 *   post:
 *     summary: Creates a new sale.
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       200:
 *         description: The sale was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       500:
 *         description: Some server error
 */
// create sale
router.post("/ev", function(req, res, next) {
    var ev = req.body;

    if (!ev.Country || !ev.Sales ||
        !ev.Year) {
        res.status(400);
        res.json({ "error": "Bad data, could not be inserted into the database." })
    } else {
        let newEV = new MongooseStudentModel(ev);
        newEV.save((err, data) => {
            if (err) res.send(err);
            res.json(data);
        });
    }
});


/**
 * @swagger
 * /api/ev/{id}:
 *   delete:
 *     summary: Deletes a single sale
 *     tags: [Sales]
 *     parameters:
 *       - name: id
 *         description: Sale id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sale was deleted
 *       404:
 *         description: The sale was not found
 */
// delete sale
router.delete("/ev/:id", function(req, res, next) {
    MongooseStudentModel.findOneAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted sale!' });
    });
});



/**
 * @swagger
 * /api/ev/{id}:
 *   put:
 *     summary: updates sales by id
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Sale id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       200:
 *         decsription: The sale was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       404:
 *         description: Sale was not found.
 *       500:
 *         description: Some errors happend.
 *
 */
// edit sale
router.put("/ev/:id", function(req, res, next) {
    var ev = req.body;
    var changedEV = {};

    if (ev.Country) {
        changedEV.Country = ev.Country;
    }

    if (ev.Sales) {
        changedEV.Sales = ev.Sales;
    }

    if (ev.Year) {
        changedEV.Year = ev.Year;
    }

    if (!changedEV) {
        res.status(400);
        res.json({ "error": "Bad Data" })
    } else {
        MongooseStudentModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true },
            (err, data) => {
                if (err) res.send(err);
                res.json(data);
            }
        );
    }
});

module.exports = router;