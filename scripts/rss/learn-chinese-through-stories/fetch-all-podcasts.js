/*
 * Downloads every podcast in the feed with trivial throttling
 */

const parser = require('fast-xml-parser')
const {promisify} = require('util')
const fs = require('fs')
const request = require('request')

const readFileAsync = promisify(fs.readFile)

async function run() {
    try {
        const rss = await readFileAsync('./rss.xml', {encoding: 'utf8'})

        if (!parser.validate(rss)) {
            console.error('RSS file not valid')
            process.exit()
        }

        const parsedFeed = parser.parse(rss, {attributeNamePrefix: '__', ignoreAttributes: false})

        const allEpisodes = parsedFeed.rss.channel.item.map(episode => {
            const url = (episode.enclosure && episode.enclosure.__url) || ''
            const insecureUrl = url.replace('https://', 'http://')
            const fileType = url.includes('.mp3') ? '.mp3' : '.m4a'

            return {
                fileType,
                pubDate: episode.pubDate,
                title: episode.title,
                url: insecureUrl,
            }
        })

        //This date format is not timezone safe, but I don't really care because it's just a date published so I can pretend it was published at that time where I am now
        const formattedDatePublished = new Date(allEpisodes[0].pubDate).toISOString().split('T')[0]
        const filePath = `./podcasts/${formattedDatePublished} - ${allEpisodes[0].title}${allEpisodes[0].fileType}`

        console.log('Getting:', allEpisodes[0].title)
        console.log('Saving as:', filePath)

        if (fs.existsSync(filePath)) {
            return console.log('Conflict, file already exists. Skipping:', filePath)
        }


        request(allEpisodes[0].url).pipe(fs.createWriteStream(filePath))
    } catch (error) {
        console.error(error)
    }
}

run()
