const mongoose = require('mongoose');
const LotteryNews = require("../../models/NewsManage/LotteryNews");

/**
 * title:新闻标题
 * pubDate: 上传日期
 * source: 新闻来源
 * commentId: 留言id
 * author: 新闻作者
 * 
 */
//新增新闻
exports.addNewLotteryNews = async (ctx) => {
    console.log("新增资讯");
    console.log(ctx.request.body);
    var title = ctx.request.body.title;
    var pubDate = ctx.request.body.pubDate;
    var source  = ctx.request.body.source;
    var author = ctx.request.body.author;
    var commnets = [];
    const p =  new LotteryNews({
        title:title,
        pubDate:pubDate,
        source:source,
        commnets:commnets,
        author:author,
    })
    p.save().then((resp)=>{
        console.log(resp);
    })
    console.log(p);
}

// 查询所有的新闻,可以分页
exports.findAllNews = async (ctx)=>{
    var pageSize = ctx.query.pageSize;
    var pageNo = ctx.query.pageNo;
    console.log("查询所有新闻");
    LotteryNews.find({}).limit(5).then((resp)=>{
        console.log(resp);
    })
}