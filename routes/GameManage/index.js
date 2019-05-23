const router = require('koa-router')();
const GameManageRouter = require("./GameManage");
const ssq = require("./ssq");
// console.log(GameManageRouter.routes());
router.use("/games",GameManageRouter.routes(),GameManageRouter.allowedMethods());
router.use("/ssq",ssq.routes(),ssq.allowedMethods())
module.exports = router;