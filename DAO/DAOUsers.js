const db = require('../BD'); //bd

/**
 * return all Users from the database
 */
module.exports.all = async function () {
   return await db.select('*').from('Users');
}

/**
 * return one User with id from the database
 * @params {int} id - id of User
 */
module.exports.find = async function (id) {
  return await db.first('*').from('Users').where({ id: id });
}

/**
 * return User with name and surname from the database
 * @params {string} name - name of user
 * @params {string} surname - surname of user
 */
module.exports.otherFind = async function (name, surname) {
  return await db.select('*').from('Users').where({ Name: name, Surname: surname });
}

/**
 * return all User in Group with id from the database
 * @params {int} id - id of Group
 */
module.exports.findInGroup = async function (id) {
  return await db.select('*').from('Users').where({ idGroup: id});
}

/**
 * add new User in database
 * @params {string} name - name of user
 * @params {string} surname - surname of user
 */
module.exports.add = async function (name, surname) {
  await db.insert({name: name, surname: surname}).into('Users');
}

/**
 * delete User in the database
 * @params {int} id - id of User
 */
module.exports.delete = async function (id) {
  await db.delete().from('Users').where({id: id});
}

/**
 * update User in database
 * @params {int} id - id of User
 * @params {string} name - name of user
 * @params {string} surname - surname of user
 */
module.exports.update = async function (id, name, surname) {
  await db.from("Users").where({id: id}).update({name: name, surname: surname});
}

/**
 * update the case idGroup of User in database to add User in Group
 * @params {int} id - id of User
 * @params {int} idGroup - id of Group
 */
module.exports.updateGroup = async function (id, idGroup) {
  await db.from("Users").where({id: id}).update({idGroup: idGroup});
}
