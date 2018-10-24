const mongoose = require('mongoose');
const GameManageSchema = require('../../schema/gameManage/games');
const GamesManage = mongoose.model('game',GameManageSchema);
module.exports = GamesManage;