const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/testapp1');

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    image:String


})

const model = mongoose.model('user' , userSchema);


module.exports = model;