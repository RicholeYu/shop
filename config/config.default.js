const mongoConfig = {
    "user": "root",
    "password": "ddainn1314",
    // "host": "127.0.0.1",
    "host": "richole.cn",
    "db": "shop"
}

const redisConfig = {
    "host": "127.0.0.1",
    // "host": "richole.cn",
    "password": "ddainn1314"
}

const uploadPath = "/var/www/web/upload"

module.exports = appInfo => {
    const config = exports = {}

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + "_1539095564651_3153"

    // add your config here
    config.middleware = []

    config.mongoose = {
        "url": `mongodb://${mongoConfig.user}:${mongoConfig.password}@${mongoConfig.host}:27017/${mongoConfig.db}?authSource=admin`,
        "options": { "useNewUrlParser": true }
    }

    config.security = {
        "csrf": {
            "enable": false
        },
        "xframe": {
            "enable": false
        }
    }

    config.session = {
        "key": "shop",
        "maxAge": 24 * 3600 * 1000,
        "httpOnly": true,
        "encrypt": true
    }
    config.redis = { 
        client: { 
            port: 6379, // Redis port 
            host: redisConfig.host, // Redis host 
            password: redisConfig.password, 
            db: 0, 
        }, 
    }
    config.io = {
        init: { },
        redis: {
            host: redisConfig.host,
            port: 6379,
            auth_pass: redisConfig.password,
            db: 0,
        },
        namespace: {
            '/': {
                connectionMiddleware: [],
                packetMiddleware: [],
            },
            '/send': {
                connectionMiddleware: [],
                packetMiddleware: [],
            }
        },
    }
    config.multipart = {
        "fileExtensions": [ '.txt' ] // 增加对 txt 扩展名的文件支持
    }

    config.uploadPath = uploadPath

    return config
}

