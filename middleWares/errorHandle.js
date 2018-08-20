/**
 * 自定义401错误处理中间件
 * 使用 koa-jwt中间件之后,如果没有token,或者token失效,该中间件会给出对应的错误信息.
 * 如果没有自定义中间件的话,会直接将koa-jwt暴露的错误信息直接返回给客户
 */
module.exports = async (ctx,next)=>{
    return next().catch((err)=>{
        if(err.status === 401){
            ctx.status = 401;
            ctx.body = {
                error: err.originalError?err.originalError:err.message
            }
        }else{
            throw err;
        }
    })
}