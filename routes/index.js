const router = require('koa-router')();
const User = require('../mongoose/constrols/user');
// console.log(User.signin);
router.post('/signin',User.signin);
// router.get('/index',async (ctx)=>{
//     console.log(ctx.query);
//     ctx.body = "hello World"
// })
// router.post('/signin',async (ctx)=>{
//     console.log(ctx.request.body);
//     // var db = mongoose.connection();
//     ctx.body = ctx;
// })


module.exports = router;
