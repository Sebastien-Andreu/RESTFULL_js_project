const jwt = require('jsonwebtoken'); //require
const db = require('../BD'); //bd
var SimpleCrypto = require("simple-crypto-js").default;

const secret = process.env.JWT_SECRET || 'secretOfAppli__9525+';

/**
 * authentificated user to use this server
 * @param ctx - The params send by user with HTML request
 */
module.exports = async (ctx) => {
  const { username, password } = ctx.request.body;

  if (!username) ctx.throw(422, 'Username required.');
  if (!password) ctx.throw(422, 'Password required.');


  const dbUser = await db.first('*').from('Auth').where({ username });
  if (!dbUser) ctx.throw(404, 'No such user.');

  var _secretKey = "some-unique-key";
  var simpleCrypto = new SimpleCrypto(_secretKey);

  if (password === simpleCrypto.decrypt(dbUser.password)) {
    const payload = { sub: dbUser.ID, name: dbUser.username , role: dbUser.role};
    const token = jwt.sign(payload, secret, { expiresIn: '50min' });

    console.log("Connection succes !!");
    console.log("token : " + token);
    ctx.body = token;
  } else {
    ctx.throw(400, 'Incorrect password.');
  }
};
