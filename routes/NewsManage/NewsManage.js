const router = require('koa-router')();
const NewsManage = require("../../mongoose/controls/newsManage/LotteryNews");
router.post('/addNewLotteryNews',NewsManage.addNewLotteryNews);
router.get('/findAllNews',NewsManage.findAllNews);
module.exports = router;