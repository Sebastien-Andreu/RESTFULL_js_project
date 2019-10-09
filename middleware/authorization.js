module.exports = async function (ctx, next){
  console.log(ctx.request.jwtPayload.role);
  if (ctx.request.jwtPayload.role == 'admin'){
    await next()
  } else {
    ctx.throw(403, 'token verified but not access'); // token non valide
  }
}
