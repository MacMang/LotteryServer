const router = require("koa-router")();
const Account = require('../../mongoose/controls/webapp/account');
router.post('/register',Account.register);
router.post('/login',Account.login);
module.exports = router;