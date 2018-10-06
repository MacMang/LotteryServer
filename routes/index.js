const router = require('koa-router')();
const User = require('../mongoose/controls/system/user');
const Role = require('../mongoose/controls/system/role');
// console.log(User.signin);
router.post('/signin',User.signin);
// 在这里做token验证,往后的请求都会要求token
router.post('/updateRoleInfo',Role.updateRoleInfo);

//系统相关的路由设置
var systemRouter = require('./system/index');
router.use("/system",systemRouter.routes(),systemRouter.allowedMethods())

module.exports = router;
