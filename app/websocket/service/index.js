module.exports = {
    verifyAccount (email, password) {
        return new Promise(resolve => {
            this.model.UserInfo.find({ email, password }, (err, docs) => {
                if (err) {
                    resolve(false)
                } else {
                    resolve(docs && docs.length > 0 ? docs[0].toJSON()._id.toString() : false)
                }
            })
        })
    },
    getConnectByUserId (userId) {
        let connect = false
        this.sockets.forEach(con => {
            if (con.__isLogin && con.__userId === userId) {
                connect = con
            }
        })
        return connect
    }
}
