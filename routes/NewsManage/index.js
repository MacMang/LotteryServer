const router = require('koa-router')();
const newsManage = require("./NewsManage");
router.use("/newsManage",newsManage.routes(),newsManage.allowedMethods());

module.exports = router;