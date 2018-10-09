'use strict';


module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    create_time: { type: Date, default: Date.now },
    last_login_time: { type: Date, default: Date.now },
    email: { type: String },
    name: { type: String },
  });

  return mongoose.model('user_info', UserSchema);
};
