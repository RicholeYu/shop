const Service = require("egg").Service
const CryptoJS = require("crypto-js")
class Ck extends Service {
    createCk (userid) {
        return CryptoJS.AES.encrypt(Date.now().toString(), userid).toString()
    }
    getTimeByCk (userid, ck) {
        return Number(CryptoJS.AES.decrypt(ck, userid).toString(CryptoJS.enc.Utf8))
    }
    isExpiredCk (userid, ck) {
        const time = this.getTimeByCk(userid, ck)
        if (isNaN(time) || time <= 0 || Date.now() - time >= 3600 * 1000) {
            return true
        }
        return false
    }
}

module.exports = Ck
