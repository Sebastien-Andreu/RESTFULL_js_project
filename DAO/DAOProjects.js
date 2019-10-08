const db = require('../BD'); //bd


module.exports.all = async function (ctx) {
   return await db.select('*').from('Project');
}

module.exports.find = async function (id) {
  return await db.first('*').from('Project').where({ ID: id });
}

module.exports.otherFind = async function (name) {
  return await db.select('*').from('Project').where({ Name: name }); //requete bd
}

module.exports.findGroup = async function (id) {
  return await db.select('*').from('Groups').where({ id: id}); //requete bd
}

module.exports.add = async function (name, desc) {
  await db.insert({name: name, desc: desc}).into('Project');
}

module.exports.delete = async function (id) {
  await db.delete().from('Project').where({ID: id}); //requete bd
}

module.exports.update = async function (id, name, desc) {
  await db.from("Project").where({ID: id}).update({Name: name, Desc: desc});
}
