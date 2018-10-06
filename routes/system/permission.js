const router = require('koa-router')();
const Permission = require('../../mongoose/controls/system/permission');
router.get('/findPermissionById',Permission.findPermissionById);
router.get('/showAllPermission',Permission.showAllPermission);
router.post('/addNewPersmission',Permission.addNewPermission);

module.exports = router;
