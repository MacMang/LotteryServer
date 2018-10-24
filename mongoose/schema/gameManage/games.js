/**
 * {"_id":"5bc73fb865c94fc5dcd2b462",
 * "name":"LotteryManage",
 * "desc":"彩票管理",
 * "games":[
 *      {
 *          cn: '双色球',
 *          en: 'ssq',
 *          icon: '',
 *          'icon2x': ''
 *      }
 *  ]}
 */

const Schema = require('../../config/mongoConfig.js');
const GameManageSchema = new Schema({
    _id: Object,
    name: String,
    desc: String,
    games: Array
})
module.exports = GameManageSchema;