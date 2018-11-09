const Service = require("egg").Service
const fs = require("fs")
const path = require("path")
class File extends Service {
    saveHeadImg (fileStream, id, uploadPath) {
        return new Promise(resolve => {
            const allowMime = [ 'image/jpeg', 'image/png' ]
            if (allowMime.indexOf(fileStream.mimeType) === '-1') {
                Promise.reject(1)
            }
            const type = fileStream.mimeType.split('/')[1] || 'jpg'
            const name = `${id}_head.${type}`
            const pathname = path.resolve(uploadPath, name)
            const ws = fs.createWriteStream(pathname)
            ws.on('error', () => {
                ws.end()
                resolve(2)
            }).on('finish', () => {
                resolve(name)
            })
            fileStream.pipe(ws)
        })
    }
}

module.exports = File
