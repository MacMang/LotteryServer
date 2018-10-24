const router = require("koa-router")();
const user = require("../../mongoose/controls/system/user");
router.get('/findAllUsers',user.findAllUsers);
router.post('/addNewUser',user.addNewUser);
router.post('/updateUserInfo',user.updateUserInfo);
router.post('/deleteUser',user.deleteUser)
module.exports = router;