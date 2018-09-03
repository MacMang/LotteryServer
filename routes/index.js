const router = require('koa-router')();
const User = require('../mongoose/constrols/system/user');
const Permission = require('../mongoose/constrols/system/permission');
// console.log(User.signin);
router.post('/signin',User.signin);
// 在这里做token验证,往后的请求都会要求token
router.post('/addNewPersmission',Permission.addNewPermission)
router.post('/showAllPermission',Permission.showAllPermission)
module.exports = router;
