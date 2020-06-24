/*
 * Takes all files that are digit-only named (epoch) and renames them using moment date format
 *
 * To run:
 * $ node epoch-to-filename.js
 *
 * You can run this from any directory and then just point to the script from there. The current directory will be the one it is executed from, not where the script resides. 
 *
 * Risks:
 * Consider backup of files before running because they will be renamed with no undo
 */

var moment = require('./moment')
var fs = require('fs');

const format = 'YYYY-MM-DD HH.mm.ss'

fs.readdir('.', function (err, files) {

    files.forEach(function (file) {

        fs.stat(file, function (err, stat) {

            if (err) {
                console.error(err);
                process.exit();
            }

            if (stat.isDirectory()) return;

            var allDigitFilename = file.match(/^\d+\.jpg$/);
            if (!allDigitFilename) {
                console.warn('File must be in format of all digits: ', file);
                return;
            }

            const milliseconds = Number.parseInt(file.split('.')[0])
            const newDate  = moment(milliseconds).format(format)

            fs.renameSync(file, `${newDate}.jpg`);
        });
    });
});
