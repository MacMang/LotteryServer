const router = require('koa-router')();
const User = require('../mongoose/constrols/system/user');
const Permission = require('../mongoose/constrols/system/permission');
const Role = require('../mongoose/constrols/system/role');
// console.log(User.signin);
router.post('/signin',User.signin);
// 在这里做token验证,往后的请求都会要求token
router.post('/addNewPersmission',Permission.addNewPermission);
router.get('/showAllPermission',Permission.showAllPermission);
router.get('/findPermissionById',Permission.findPermissionById);
router.post('/updateRoleInfo',Role.updateRoleInfo);
module.exports = router;
