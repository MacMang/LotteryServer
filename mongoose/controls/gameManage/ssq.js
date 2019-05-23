const mongoose = require('mongoose');
const {ssq} = require('../../models/gameManage/baseModel')

exports.findSSQ = async (ctx)=>{
    const query = ctx.request.query;
    var pageSize = parseInt(query.pageSize);
    var pageNo = parseInt(query.pageNo);
    console.log('pageSize',pageSize,"pageNo",pageNo);
    var resp = await new Promise((resolve,reject)=>{
        //分页查询
       var rs =  ssq.find({});
       rs.then((resp)=>{
            //获取当前表的文章总数
            var data = resp[0].data.slice(pageNo*pageSize,(pageNo+1)*pageSize);
            var obj = {
                _id:resp[0]._id,
                data:data,
                total:200,
                currentPage:pageNo,
                hotcold:resp[0].hotCold
            }
            resolve(obj)
       })
    })
     //响应前端数据
     ctx.body =  {
        code: 200,
        message: '查询成功',
        data:resp,
        total: resp.total
    };;
}