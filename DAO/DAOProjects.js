const db = require('../BD'); //bd

/**
 * return all Project from the database
 */
module.exports.all = async function () {
   return await db.select('*').from('Project');
}

/**
 * return one Project with id from the database
 * @params {int} id - id of Project
 */
module.exports.find = async function (id) {
  return await db.first('*').from('Project').where({ ID: id });
}

/**
 * return Project with name and surname from the database
 * @params {string} name - name of Project
 */
module.exports.otherFind = async function (name) {
  return await db.select('*').from('Project').where({ Name: name });
}

/**
 * return Group with id from the database
 * @params {int} id - id of Group
 */
module.exports.findGroup = async function (id) {
  return await db.select('*').from('Groups').where({ id: id});
}

/**
 * add new Project in database
 * @params {string} name - name of Project
 * @params {string} desc - description of Project
 */
module.exports.add = async function (name, desc) {
  await db.insert({name: name, desc: desc}).into('Project');
}

/**
 * delete Project in the database
 * @params {int} id - id of Project
 */
module.exports.delete = async function (id) {
  await db.delete().from('Project').where({ID: id});
}

/**
 * update Project in database
 * @params {int} id - id of Project
 * @params {string} name - name of Project
 * @params {string} surname - surname of Project
 */
module.exports.update = async function (id, name, desc) {
  await db.from("Project").where({ID: id}).update({Name: name, Desc: desc});
}
