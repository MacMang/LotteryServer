const mongoose = require('mongoose');
const games = require('../../models/gameManage/games');
const os = require('os');

function getIp() {
  let ip
  for (let netWorkStr of os.networkInterfaces().en0) {
    if (netWorkStr.family === 'IPv4') {
      ip = netWorkStr.address
    }
  }
  return 'http://'+ip+":3000"
}
exports.addNewGame = async (ctx)=>{
    console.log("新增玩法");
    //更新 "games":[]
    // console.log(ctx.request.body);
    var en = ctx.request.body.en;
    var cn = ctx.request.body.cn;
    console.log("en",en,"cn",cn);
    /**
     * icon要先进行上传,上传成功之后再去获取上传后的图片地址,然后存储到数据库中
     */
    var imagesIndex = ctx.request.files.file[0].path.indexOf('/images')
    var icon = getIp()+ctx.request.files.file[0].path.slice(imagesIndex,ctx.request.files.file[0].path.length);
    var icon2 = getIp()+ctx.request.files.file[1].path.slice(imagesIndex,ctx.request.files.file[1].path.length);
    var myid = mongoose.Types.ObjectId('5bc80177de1e2be9de5518ec');
    console.log(icon);
    console.log(icon2);
    /**
     * 逻辑:
     * 判断数据库中是否有相同的数据,如果相同的数据,直接更新数据即可,无需重新压栈
     */
    var data = await new Promise((resolve,reject)=>{
        games.find({_id:myid},(err,data)=>{
            data[0].games.forEach((item)=>{
                if(item.en==en){
                    console.log(item);
                    resolve(true);
                }
            })
            resolve(false);
        })
    })
    var rs = await new Promise((resolve,reject)=>{
        if(data){
            games.update({_id:myid,"games.en":en},{$set:{"games.$.icon":icon,"games.$.icon2":icon2,"games.$.cn":cn}})
            .then((resp)=>{
                console.log(cn+"已经存在,更新完成");
                console.log(resp);
                //更新完之后要删除原来的图片
                resolve(resp);
            })
        }else{
            games.update({_id:myid},
                {$push:{'games': {cn:cn,en:en,icon:icon,icon2:icon2}}},
                (err,data)=>{
                if(err){
                    console.log("请求出错");
                    console.log(err);
                    return;
                }
                //不管结果怎样,我这里先直接resolve
                resolve(data);
            })
        }
    })
    if(rs.ok){
        ctx.body = {
            message: '更新彩票列表成功',
            success: true
        }
    }else{
        ctx.body = {
            message: '更新彩票列表失败',
            success: false
        }
    }
    
}

// 查询所有的彩种
exports.findAllGames = async (ctx,next)=>{
    var rs = await new Promise((resolve,reject)=>{
        games.find({},(err,data)=>{
            if(err){
                console.log(err);
                return}
            console.log("查询所有的彩种");
            console.log(data);
            resolve(data);
        })
    })
    ctx.response.status = 200;
    ctx.body = {
        message: '获取所有彩种成功',
        success: true,
        data: rs
    }
    next();
}
const baseModel = require("../../models/gameManage/baseModel");
//根据彩种名称获取彩种的数据
exports.findByGameName = async (ctx,next)=>{
    const query = ctx.request.query;
    var gameName = query.gameName;
    var pageSize = parseInt(query.pageSize);
    var pageNo = parseInt(query.pageNo);
    var rs = await new Promise((resolve,reject)=>{
        baseModel[gameName].find({}).then((resp)=>{
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
    console.log(rs);
      //响应前端数据
    ctx.body =  {
        code: 200,
        message: `查询${gameName}成功`,
        data:rs,
        total: rs.total
    };;
}