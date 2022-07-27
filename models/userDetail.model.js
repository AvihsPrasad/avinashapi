var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var saltRounds = 10; 

var RegisterSchema = new Schema({
    name: {type: String, trim: true, required: true},
    email: {type: String, trim: true, required: true, unique: true},
    password: {type: String, trim: true, required: true,unique: true},
    c_password: {type: String, trim: true, required: true,unique: true},
    phone: {type: Number, required: true, trim: true}
});

RegisterSchema.pre('save' , function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('register' , RegisterSchema);