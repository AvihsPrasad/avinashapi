var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    c_name: {type: String, trim: true},
    item: {type: String, trim: true},
    cost: {type: Number, trim: true},
    balance: {type: Number, trim: true},
});

module.exports = mongoose.model('user', UserSchema)