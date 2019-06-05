const router = require("koa-router")();
const account = require("./account");

router.use('/account',account.routes(),account.allowedMethods());
module.exports = router;