const Koa = require('koa')
,json = require('koa-json')()
,cors = require('koa-cors')();

const app = new Koa();
//引入koa-jwt
const jwt = require('koa-jwt');
// 解决401问题
const errorHandle = require('./middleWares/errorHandle');
app.use(errorHandle);
//使用koa-jwt
const secert = 'jwt_secret';
// unless设置哪些api是不需要通过token验证的,也就是通畅所说的public api
//无需登录就能访问的api,在使用koa-jwt之后,所有的路由(出了unless()设置的路由之外)
//都会检查Header首部中的token,是否存在,是否有效,只有正确之后才能访问
app.use(jwt({
      secert
    }).unless({
      path: [/\/signin/]
    }))
//处理post请求
app.use(require('koa-bodyparser')())
var indexRouter = require('./routes/index')

// 使用cors中间件解决客户端跨域问题
app.use(cors);
app.use(json);
app.use(indexRouter.routes(),indexRouter.allowedMethods());


//静态文件
app.use(require('koa-static')(__dirname + '/public'));
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
  });
  
module.exports = app;
  