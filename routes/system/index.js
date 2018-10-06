const router = require('koa-router')();
const permissionRouter = require("./permission");
const roleRouter = require("./role")
const userRouter = require("./users")
router.use("/permission",permissionRouter.routes(),permissionRouter.allowedMethods());
router.use("/role",roleRouter.routes(),roleRouter.allowedMethods());
router.use("/user",userRouter.routes(),userRouter.allowedMethods());
module.exports = router;