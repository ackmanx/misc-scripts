/*
 * Downloads every podcast in the feed with trivial throttling
 * This checks for the files in ./podcasts and skips if they are there
 * It checks for existence based on the file name so if they are moved or renamed they will download again
 *
 * TODO: Create a text file to cache the filenames in instead of checking for actual files
 */

const parser = require('fast-xml-parser')
const {promisify} = require('util')
const fs = require('fs')
const request = require('request')

const readFileAsync = promisify(fs.readFile)
const requestAsync = promisify(request)

async function run() {
    try {
        // const rss = await readFileAsync('./example-rss.xml', {encoding: 'utf8'})

        const response = await requestAsync('https://learningchinesethroughstories.libsyn.com/rss')
        const rssFeed = response.body

        const rssValidation = parser.validate(rssFeed)

        if (rssValidation !== true) {
            console.error(rssValidation.err)
            process.exit()
        }

        const parsedFeed = parser.parse(rssFeed, {attributeNamePrefix: '__', ignoreAttributes: false})

        const allEpisodes = parsedFeed.rss.channel.item.map(episode => {

            if (!episode.enclosure) return

            const url = episode.enclosure.__url
            const insecureUrl = url.replace('https://', 'http://')
            const fileType = url.includes('.mp3') ? '.mp3' : '.m4a'

            return {
                fileType,
                pubDate: episode.pubDate,
                title: episode.title,
                url: insecureUrl,
            }
        }).filter(Boolean)

        let delay = 0

        allEpisodes.forEach(episode => {
            //This date format is not timezone safe, but I don't really care because it's just a date published so I can pretend it was published at that time where I am now
            const formattedDatePublished = new Date(episode.pubDate).toISOString().split('T')[0]
            const filePath = `./podcasts/${formattedDatePublished} - ${episode.title}${episode.fileType}`

            if (fs.existsSync(filePath)) {
                return console.log('Conflict, file already exists. Skipping:', filePath)
            }

            setTimeout(() => {
                console.log('Getting:', episode.title)
                console.log('Saving as:', filePath)

                request(episode.url).pipe(fs.createWriteStream(filePath))
            }, delay)

            delay = Math.floor(delay + Math.random() * 5 * 1000)
        })
    } catch (error) {
        console.error(error)
    }
}

run()
