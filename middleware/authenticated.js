const jwt = require('jsonwebtoken'); // user token

const secret = process.env.JWT_SECRET || 'secretOfAppli__9525+';

/**
 * use to find if user is connected
 * @param ctx - The params send by user with HTML request
 * @param next - The following function to be called
 */
module.exports = async (ctx, next) => {
  if (!ctx.headers.authorization) ctx.throw(401, 'No token.'); //Unauthorized

  const token = ctx.headers.authorization.split(' ')[1];
  try {
    ctx.request.jwtPayload = jwt.verify(token, secret);
    console.log("authenticated succes !");
  } catch (err) {
    ctx.throw(err.status || 498, err.text); //Token expired/invalid
  }
  await next();
};
