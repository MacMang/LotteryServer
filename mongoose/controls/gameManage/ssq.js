const mongoose = require('mongoose');
const {ssq} = require('../../models/gameManage/baseModel')

// 新增新开奖记录
exports.addNewRecord = async (ctx)=>{
    const body = ctx.request.body;
    const period = body.period;
    const winnerNumber = body.winnerNumber;
    
}