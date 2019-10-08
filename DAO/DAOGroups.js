const db = require('../BD'); //bd


module.exports.all = async function (ctx) {
   return await db.select('*').from('Groups');
}

module.exports.find = async function (id) {
  return await db.first('*').from('Groups').where({ id: id }); //requete bd
}

module.exports.otherFind = async function (name) {
  return await db.select('*').from('Users').where({ name: name }); //requete bd
}

module.exports.findGroup = async function (id) {
  return await db.first('*').from('Groups').where({ IDProject: id }); //requete bd
}

module.exports.add = async function (name) {
  await db.insert({name: name}).into('Groups');
}

module.exports.delete = async function (id) {
  await db.delete().from('Groups').where({id: id}); //requete bd
}

module.exports.update = async function (id, name) {
  await db.from("Groups").where({id: id}).update({name: name});
}

module.exports.updateProject = async function (idGroup, idProject) {
  await db.from("Groups").where({ID: idGroup}).update({IDProject: idProject});
}
