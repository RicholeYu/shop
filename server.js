// const MongoClient = require("mongodb").MongoClient
// const url = "mongodb://root:ddainn1314@35.200.61.173:27017/"
// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//     if (err) throw err
//     console.log("数据库已创建")
//     const dbo = db.db("shop")
//     dbo.collection("user_info").find({}).toArray(function(err, result) { // 返回集合中所有数据
//         if (err) throw err
//         console.log(result)
//     })
// })
const mongoose = require("mongoose")
mongoose.connect("mongodb://root:ddainn1314@35.200.61.173:27017/shop?authSource=admin", { "useNewUrlParser": true }, function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log("连接成功")
        const schema = new mongoose.Schema({ })
        const MyModel = mongoose.model("user_info", schema, "user_info")
        // const doc1 = new MyModel({ size: "small" })
        MyModel.find({ "username": "richole" }, (err, docs) => {
            console.log(err, docs)
        })
    }
})
