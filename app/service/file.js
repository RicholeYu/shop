const Service = require("egg").Service
const fs = require("fs")
class File extends Service {
    saveHeadImg (fileStream, id) {
        return new Promise(resolve => {
            const type = fileStream.mimeType.split('/')[1] || 'jpg'
            const path = `${id}_head.${type}`
            const ws = fs.createWriteStream(`./${path}`)
            ws.on('error', () => {
                ws.end()
                resolve(false)
            }).on('finish', () => {
                resolve(path)
            })
            fileStream.pipe(ws)
        })
    }
}

module.exports = File
