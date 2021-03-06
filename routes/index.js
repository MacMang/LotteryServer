const router = require('koa-router')();
const User = require('../mongoose/controls/system/user');
const Role = require('../mongoose/controls/system/role');
console.log(User.signin);
var rs = router.post('/signin',User.signin);
// 在这里做token验证,往后的请求都会要求token
router.post('/updateRoleInfo',Role.updateRoleInfo);

//系统相关的路由设置
var systemRouter = require('./system/index');
router.use("/system",systemRouter.routes(),systemRouter.allowedMethods())

//彩票管理
var gameManageRouter = require('./GameManage/index');
// console.log(gameManageRouter);
router.use('/gameManage',gameManageRouter.routes(),gameManageRouter.allowedMethods())

//webapp前端管理
const webappRouter = require("./webapp")
router.use("/webapp",webappRouter.routes(),webappRouter.allowedMethods());
module.exports = router;

