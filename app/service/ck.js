const Service = require("egg").Service
const CryptoJS = require("crypto-js")
class Ck extends Service {
    createCk(userid) {
        return CryptoJS.AES.encrypt(Date.now(), userid)
    }
    getTimeByCk(userid, ck) {
        return CryptoJS.AES.decrypt(ck, userid)
    }
    isExpiredCk(userid, ck) {
        return Date.now() - this.getTimeByCk(userid, ck) >= 3600 * 1000
    }
}

module.exports = Ck
