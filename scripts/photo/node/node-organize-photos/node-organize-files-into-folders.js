/*
 * Finds files matching the passed-in format and moves them into directories where the directory name is the part of the file matching the format
 *
 * To run:
 * node <filename>.js '\d\d'
 *
 * Script only moves files fitting the format. Everything else is ignored.
 */

//todo: Updates I want to do this
//
// output directories used/created
// put all renamed files in array, all skipped in array, output at end
//

const fs = require('fs')

const regex = getArgs()[0]

fs.readdir('.', function (err, files) {

    files.forEach(function (file) {

        fs.stat(file, function (err, stat) {

            if (err) {
                console.error(err)
                process.exit()
            }

            if (stat.isDirectory()) return

            const match = file.match(new RegExp(regex))
            if (!match) {
                console.warn(`${file} skipped`)
                return
            }

            const directoryPattern = match[0]

            //stat will throw an exception if file does not exist. This is preferred method by node.
            try {
                fs.statSync(directoryPattern)
            }
            catch(ex) {
                fs.mkdirSync(directoryPattern)
            }

            fs.renameSync(file, directoryPattern + '/' + file)
        })
    })
})

function getArgs() {
    const args = process.argv.slice(2)

    if (!args.length) {
        console.error('You need to pass a regex pattern for the directory names')
        process.exit()
    }

    return args
}
