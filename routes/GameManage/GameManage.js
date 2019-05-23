const router = require("koa-router")();
const GameManage = require('../../mongoose/controls/gameManage/games');

router.post('/addNewGame',GameManage.addNewGame);
router.get('/findAllGames',GameManage.findAllGames)
router.get('/findByGameName',GameManage.findByGameName)
module.exports = router;
