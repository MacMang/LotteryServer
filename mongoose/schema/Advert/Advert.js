//基础配置
const Schema = require('../../config/mongoConfig');

/**
 * 广告管理 
 * 广告标题: Title                              
 * 广告文字内容 ADContent
 * 广告图片 ADPic
 * 广告上传时间ADPubDate
 * 广告上传者ADAuthor
 * 广告链接 ADLinke
 * 广告类型 ADType
 *  */
const AdvertSchema = new Schema({
    title: String,
    content: String,
    picAddr: String,
    pubDate: String,
    author: String,
    linke: String,
})
module.exports = AdvertSchema;
