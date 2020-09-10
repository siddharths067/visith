// import { ProcessCsvFile } from "./routes/ProcessCsvFile";
const { ProcessCsvFile } = require("./routes/ProcessCsvFile");
var path = require(`path`);
var fs = require(`fs`);
var logger = require(`./logger`);

// launches an async function for every file
exports.ProcessFolder = function(folderPath){
    fs.readdir(folderPath, (error, files) => {
        if(error != null){
            logger.error(`An error occurred ${error}`);
        }
        files.forEach(async (file) => {
            ProcessCsvFile(path.join(folderPath, file)).on("error", err => {
                logger.error(`Error processing file by cron job ${err}`);
                // fs.unlink(req.file.path)
            }).on('close', () => {
                logger.info(`Deleting File`);
                fs.unlink(req.file.path);
            });;
        })
    })
};