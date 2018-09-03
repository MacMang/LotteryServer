const mongoose = require('mongoose');
const UserSchema = require('../../schema/system/user');
const User = mongoose.model('user',UserSchema);
module.exports = User;