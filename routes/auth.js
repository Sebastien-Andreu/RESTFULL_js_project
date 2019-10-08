const jwt = require('jsonwebtoken'); //require
const db = require('../BD'); //bd

const secret = process.env.JWT_SECRET || 'secretOfAppli__9525+'; //le secret, il ne dois pas etre publique, que le serveur doit le connaitre

module.exports = async (ctx) => {
  const { username, password } = ctx.request.body; //recupere les données du POST

  if (!username) ctx.throw(422, 'Username required.'); // si il n'y a pas d'username alors 422 error
  if (!password) ctx.throw(422, 'Password required.'); // si il n'y a pas de password alors 422 error

  const dbUser = await db.first('*').from('Auth').where({ username }); //recupere l'users depuis la BD
  if (!dbUser) ctx.throw(401, 'No such user.'); // si il ne trouve pas alors 401 error
  console.log(dbUser);

  if (password === dbUser.password) { // si le mot de passe correspond
    console.log(dbUser);
    const payload = { sub: dbUser.ID, name: dbUser.username , role: dbUser.role}; // paylord sub: l'id de l'user
    console.log(payload);
    const token = jwt.sign(payload, secret, { expiresIn: '10min' }); // le serveur sign le token avec le paylord, le "secret", le temps de vie
    ctx.body = token; //envoie le token au client
  } else {
    ctx.throw(401, 'Incorrect password.'); //error mot de passe
  }
};
