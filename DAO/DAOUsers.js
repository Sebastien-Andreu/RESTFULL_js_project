const db = require('../BD'); //bd

module.exports.all = async function (ctx) {
   return await db.select('*').from('Users');
}

module.exports.find = async function (id) {
  return await db.first('*').from('Users').where({ id: id });
}

module.exports.otherFind = async function (name, surname) {
  return await db.select('*').from('Users').where({ Name: name, Surname: surname }); //requete bd
}

module.exports.findInGroup = async function (id) {
  return await db.select('*').from('Users').where({ idGroup: id}); //requete bd
}

module.exports.add = async function (name, surname) {
  await db.insert({name: name, surname: surname}).into('Users');
}

module.exports.delete = async function (id) {
  await db.delete().from('Users').where({id: id}); //requete bd
}

module.exports.update = async function (id, name, surname) {
  await db.from("Users").where({id: id}).update({name: name, surname: surname});
}

module.exports.updateGroup = async function (id, idGroup) {
  await db.from("Users").where({id: id}).update({idGroup: idGroup});
}
