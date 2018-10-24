const router = require('koa-router')();
const GameManageRouter = require("./GameManage");
// console.log(GameManageRouter.routes());
router.use("/games",GameManageRouter.routes(),GameManageRouter.allowedMethods());

module.exports = router;