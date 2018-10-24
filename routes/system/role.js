const router = require("koa-router")();
const role = require("../../mongoose/controls/system/role");
router.get("/findAllRoles",role.findAllRoles);
router.post("/addNewRole",role.addNewRole);
router.post("/deleteRole",role.deleteRole)
module.exports = router;