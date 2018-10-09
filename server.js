const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://root:ddainn1314@35.200.61.173:27017/';
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  console.log('数据库已创建');
  const dbo = db.db('shop');
  dbo.collection('user_info').find({}).toArray(function(err, result) { // 返回集合中所有数据
    if (err) throw err;
    console.log(result);
  });
});
