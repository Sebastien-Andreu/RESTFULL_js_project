const db = require('../BD'); //bd

/**
 * return all Groups from the database
 */
module.exports.all = async function () {
   return await db.select('*').from('Groups');
}

/**
 * return one Group with id from the database
 * @params {int} id - id of Group
 */
module.exports.find = async function (id) {
  return await db.first('*').from('Groups').where({ id: id });
}

/**
 * return Group with name and surname from the database
 * @params {string} name - name of Group
 */
module.exports.otherFind = async function (name) {
  return await db.select('*').from('Groups').where({ name: name });
}

/**
 * return Group in Project with id from the database
 * @params {int} id - id of Group
 */
module.exports.findGroup = async function (id) {
  return await db.first('*').from('Groups').where({ IDProject: id });
}

/**
 * add new Group in database
 * @params {string} name - name of Group
 */
module.exports.add = async function (name) {
  await db.insert({name: name}).into('Groups');
}

/**
 * delete Group in the database
 * @params {int} id - id of Group
 */
module.exports.delete = async function (id) {
  await db.delete().from('Groups').where({id: id});
}

/**
 * update Group in database
 * @params {int} id - id of Group
 * @params {string} name - name of Group
 */
module.exports.update = async function (id, name) {
  await db.from("Groups").where({id: id}).update({name: name});
}

/**
 * update the case idProject of Group in database to add Group in Project
 * @params {int} idGroup - id of Group
 * @params {int} idProject - id of Project
 */
module.exports.updateProject = async function (idGroup, idProject) {
  await db.from("Groups").where({ID: idGroup}).update({IDProject: idProject});
}
