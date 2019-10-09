const jwt = require('jsonwebtoken'); // user token

const secret = process.env.JWT_SECRET || 'secretOfAppli__9525+'; // définit le Secret

module.exports = async (ctx, next) => {
  if (!ctx.headers.authorization) ctx.throw(403, 'No token.'); // verifie si on a mis un token

  const token = ctx.headers.authorization.split(' ')[1]; // split le token pour enlever le "Bearer " qui est devant le token
  try {
    ctx.request.jwtPayload = jwt.verify(token, secret); // on verifie la validité tu token
  } catch (err) {
    ctx.throw(err.status || 403, err.text); // token non valide
  }

  await next();
};
