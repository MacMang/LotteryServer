var jwt = require('jsonwebtoken');//用来创建和确认用户信息摘要

// 检查用户会话
module.exports =  async (ctx,next) =>{
    const secert = 'jwt_secret';
  //检查post的信息或者url查询参数或者头信息
    const token = ctx.header.authorization;
    if (ctx.request.method == "OPTIONS") {
        ctx.response.status = 200
    }
  // 解析 token
  if (token) {
    // 确认token
    const parts = ctx.header.authorization.split(' ');
    const scheme = parts[0];
    const credentials = parts[1];
    var rs = await new Promise((resolve,reject)=>{
        jwt.verify(credentials, secert, function(err, decoded) {
            if (err) {
              reject( { success: false, message: 'token信息错误.' })
            } else {
            // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
              ctx.api_user = decoded;
              resolve({success:true,message:ctx.api_user});
            }
        });
    })
    if(rs.success){
        ctx.state['key'] = rs.message; 
    }
    await next(); 
  } else {
    // 如果没有token，则返回错误
    ctx.body = {
      success: false,
      message: '没有提供token！'
    }
  }
};