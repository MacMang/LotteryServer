const router = require("koa-router")();
const ssq = require('../../mongoose/controls/gameManage/ssq');
router.get("/findSSQ",ssq.addNewRecord)
module.exports = router;