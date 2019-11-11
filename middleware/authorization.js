/**
 * use to find if role of user connected is Admin or not for the acces of function
 * @param ctx - The params send by user with HTML request
 * @param next - The following function to be called
 */
module.exports = async function (ctx, next){
  if (ctx.request.jwtPayload.role == 'admin'){
    console.log("authorization succes ! admin is connected");
    await next()
  } else {
    ctx.throw(403, 'token verified but not access'); // 401 = Unauthorized
  }
}
