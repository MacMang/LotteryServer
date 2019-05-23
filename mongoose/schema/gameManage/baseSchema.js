const Schema = require("../../config/mongoConfig")

const baseSchema = new Schema({
    data: Object, 
    hotCold: Object,
    result: Number
})

epxorts = module.exports = baseSchema;