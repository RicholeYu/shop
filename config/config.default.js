"use strict"

module.exports = appInfo => {
    const config = exports = {}

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + "_1539095564651_3153"

    // add your config here
    config.middleware = []

    config.mongoose = {
        "url": "mongodb://root:ddainn1314@35.200.61.173:27017/shop?authSource=admin",
        "options": { "useNewUrlParser": true },
    }

    config.security = {
        "csrf": {
            "enable": false,
        },
        "xframe": {
            "enable": false,
        },
    }

    config.session = {
        "key": "shop",
        "maxAge": 24 * 3600 * 1000,
        "httpOnly": true,
        "encrypt": true,
    }

    return config
}

