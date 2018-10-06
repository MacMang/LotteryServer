const router = require("koa-router")();
const role = require("../../mongoose/controls/system/role");
router.get("/findAllRoles",role.findAllRoles);
router.post("/addNewRole",role.addNewRole)
module.exports = router;