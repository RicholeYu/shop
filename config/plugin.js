"use strict"

// had enabled by egg
// exports.static = true;

exports.mongoose = {
    "enable": true,
    "package": "egg-mongoose"
}

exports.session = true


exports.redis = {
    "enable": true,
    "package": 'egg-redis'
}
