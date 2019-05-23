const mongoose = require("mongoose");
const AdvertSchema = require('../../schema/Advert/Advert')
const AdvertModel = mongoose.model('advert',AdvertSchema);
module.exports = AdvertModel;