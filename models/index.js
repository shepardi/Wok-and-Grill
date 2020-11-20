//bring in mongoose
const mongoose = require('mongoose');

//bring .enffile
//require("dotenv").config();

//connect to mongodb
const connectionString = 'mongodb://localhost:27017/wokAndGrill';
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(function () {
    console.log('mongoose connected');
  })
  .catch(function (error) {
    console.log(error);
  });

mongoose.connection.on('disconnected', function () {
  console.log('mongoose disconnected');
});

//export models
module.exports = {
  Menu: require('./Menu'),
  Item: require('./Item'),
  User: require('./User'),
  Comment: require('./Comment'),
  Hour: require('./Hour'),
  Slide: require('./Slide')
};