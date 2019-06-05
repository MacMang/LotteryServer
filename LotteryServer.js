// const Koa = require('koa')
// ,json = require('koa-json')()
// ,cors = require('koa-cors')();

// const LotteryServer = new Koa();

// // 使用cors中间件解决客户端跨域问题
// LotteryServer.use(cors);
// // 当遇到options请求之后,直接返回相应
// LotteryServer.use(async function(ctx, next) {
//   ctx.set("Access-Control-Allow-Origin", "*");
//   ctx.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
//   ctx.set("Access-Control-Max-Age", "3600");
//   ctx.set("Access-Control-Allow-Headers", "x-requested-with,Authorization,Content-Type,Accept");
//   ctx.set("Access-Control-Allow-Credentials", "true");
//   if (ctx.request.method == "OPTIONS") {
//     ctx.response.status = 200
//   }
//   console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
//   try {
//     await next();
//   } catch (err) {
//     ctx.response.status = err.statusCode || err.status || 500;
//     ctx.response.body = {
//       message: err.message,
//       info: '处理错误'
//     };
//   }
// })
// //引入koa-jwt
// const jwt = require('koa-jwt');
// //使用koa-jwt
// const secret = 'jwt_secret';

// // unless设置哪些api是不需要通过token验证的,也就是通畅所说的public api
// //无需登录就能访问的api,在使用koa-jwt之后,所有的路由(出了unless()设置的路由之外)
// //都会检查Header首部中的token,是否存在,是否有效,只有正确之后才能访问
// // LotteryServer.use(CheckApiToken);
// LotteryServer.use(jwt({secret}).unless({
//     path: [/^\/signin/,/^\/images/,/^\/gameManage/] //数组中的路径不需要通过jwt验证
// }))
// //处理post请求
// LotteryServer.use(require('koa-bodyparser')())

// // 解决401问题
// const errorHandle = require('./middleWares/errorHandle');
// LotteryServer.use(errorHandle);
// var indexRouter = require('./routes/index')

// LotteryServer.use(json);

// LotteryServer.use(indexRouter.routes(),indexRouter.allowedMethods());

// //静态文件
// LotteryServer.use(require('koa-static')(__dirname + '/public'));
// LotteryServer.on('error', (err, ctx) => {
//     console.error('server error', err, ctx)
//   });
  
// module.exports = LotteryServer;
  
// var re = /[0-9]+$/ig
var re = /^0?[1-9]?[1-9]+(\.[0,5])?$/;
// var re = /^[\+\-]?[1-9]\d*(\.\d*)?$/;
console.log(re.test('4.0'))
console.log(re.test('4.1'))
console.log(re.test('4.5'))
console.log(re.test('00.5'))