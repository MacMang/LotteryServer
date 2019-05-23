const Schema = require('../../config/mongoConfig.js');
/**
 * title:新闻标题
 * pubDate: 上传日期
 * source: 新闻来源
 * commnets: 留言数组
 * author: 新闻作者
 * 
 */
const NewsSchema = new Schema({
    title: String,
    pubDate: String,
    source: String,
    commnets: Array,
    author: String,
})
module.exports = NewsSchema;