const mongoose = require("mongoose");
const accountSchema = require("../../schema/webapp/account")
const accountModel = mongoose.model('account',accountSchema);
module.exports = accountModel;