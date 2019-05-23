const mongoose = require('mongoose');
const NewsSchema = require("../../schema/NewsManage/LotteryNews");
const NewsModel = mongoose.model('new',NewsSchema);
module.exports = NewsModel;
