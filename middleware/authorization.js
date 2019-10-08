module.exports = async function (ctx){
  console.log(ctx.request.jwtPayload.role);
  if (ctx.request.jwtPayload.role == 'admin'){
    return true
  } else {
    console.log("test1");
    return false
  }
}
