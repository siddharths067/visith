var express = require('express');
var router = express.Router();
var csv = require(`csv-parser`);
var multer = require(`multer`);
var logger = require(`../logger`);
var fs = require(`fs`);
const UserStepEntry = require('../database/models/UserStep');
const { response } = require('../app');
const { ProcessCsvFile } = require("./ProcessCsvFile");
/* GET home page. */
var upload = multer({
    dest: 'tmp/csv/'
});

router.post('/', upload.single(`file`), function(req, res, next) {
    const filePath = req.file.path;

    ProcessCsvFile(filePath).on("error", err => {
        logger.error(`Error processing file ${err}`);
        // fs.unlink(req.file.path)
    }).on('close', () => {
        logger.info(`Deleting File`);
        fs.unlink(req.file.path);
    });
    // sending 
    return res.status('200').send({
        info: "File sent for processing"
    });
});

router.get('/', function(req, res, next) {
    UserStepEntry.findAll().then((results) => {
        const responseObject = results.map(e => e.dataValues);
        res.status(200).send({
            entries: responseObject
        })
    }).catch((err, res) => {
        res.status(500).send({
           error: err
        });
    })

});



module.exports = router;

