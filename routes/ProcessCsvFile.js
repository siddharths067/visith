var csv = require(`csv-parser`);
var logger = require(`../logger`);
var fs = require(`fs`);
const UserStepEntry = require('../database/models/UserStep');

// Streaming and then processing every row
function ProcessCsvFile(filePath) {
    return fs.createReadStream(filePath).pipe(csv()).on("data", function (data) {
        // logger.info(`Data received`);
        // console.table(data)
        UserStepEntry.build({
            id: data.id,
            name: data.name,
            date: data.date,
            steps: data.steps,
            calories: data.calories
        }).save().catch(err => {
            logger.error(`Couldn't save user error: ${err}`);
        });
    });
}
exports.ProcessCsvFile = ProcessCsvFile;
