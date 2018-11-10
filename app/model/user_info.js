
module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema

    const UserSchema = new Schema({
        "password": { "type": String },
        "create_time": { "type": Date, "default": Date.now },
        "last_login_time": { "type": Date, "default": Date.now },
        "email": { "type": String },
        "name": { "type": String },
        "sex": { "type": String, "default": "male" },
        "image": { "type": String, "default": "https://richole.cn/upload/default.png" }
    })

    return mongoose.model("user_info", UserSchema, "user_info")
}
