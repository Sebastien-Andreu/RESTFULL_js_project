const DAOGroups = require('../DAO/DAOGroups')
const DAOUsers = require('../DAO/DAOUsers')
const DAOProject = require('../DAO/DAOProjects')
const Groups = require('../class/Groups');
const Users = require('./Users')

module.exports.all = async function (ctx) {
    const allGroups = await DAOGroups.all();
    const arrayGroups = [];
    for await (let group of allGroups) {
      arrayGroups.push(new Groups(group.id, group.name, await Users.findUsersInGroups(group.id)));
    }
    ctx.body = arrayGroups; //arrayUsers[0].getNom
}

module.exports.find = async function (ctx) {
  const group = await DAOGroups.find(ctx.params.id);
  if (group){
    ctx.body = new Groups(group.id, group.name, await Users.findUsersInGroups(group.id));
  } else {
    ctx.throw(401, 'Groups not found'); // si il ne trouve pas alors 401 error
  }
}

module.exports.add = async function (ctx) {
  const { name } = ctx.request.body; //recupere les données du POST
  if (!name) ctx.throw(422, 'Name required.'); // si il n'y a pas d'username alors 422 error

  const group = await DAOGroups.otherFind(name);
  if (group.length == 0){
    await DAOGroups.add(name);
  } else {
    ctx.throw(401, 'Groups already exist'); // si il ne trouve pas alors 401 error
  }
}

module.exports.delete = async function (ctx) {
  if (await DAOGroups.find(ctx.params.id)) {
    await DAOGroups.delete(ctx.params.id);
    const allUserInThisGroup = await Users.findUsersInGroups(ctx.params.id);
    for await (let user of allUserInThisGroup){
      // const userdb = await DAOUsers.otherFind(user.getName, user.getSurname);
      // await DAOUsers.updateGroup(userdb[0].ID, null);
      await DAOUsers.updateGroup(user.getId(), null);
    }
  } else {
    ctx.throw(401, 'Group not exist'); // si il ne trouve pas alors 401 error
  }
}

module.exports.update = async function (ctx) {
  const { name } = ctx.request.body; //recupere les données du POST
  if (!name) ctx.throw(422, 'Name required.'); // si il n'y a pas d'username alors 422 error

  if (await DAOGroups.find(ctx.params.id)) {
    await DAOGroups.update(ctx.params.id, name);
  } else {
    ctx.throw(401, 'Group not exist'); // si il ne trouve pas alors 401 error
  }
}

module.exports.addProject = async function (ctx){
  const { idGroup } = ctx.request.body; //recupere les données du POST
  if (!idGroup) ctx.throw(422, 'id of Group required.');

  const project = await DAOProject.find(ctx.params.id);
  if (project) {
    if (await DAOGroups.find(idGroup)) {
      await DAOGroups.updateProject(idGroup, project.ID);
    } else {
      ctx.throw(401, 'User not exist'); // si il ne trouve pas alors 401 error
    }
  } else {
    ctx.throw(401, 'Group not exist'); // si il ne trouve pas alors 401 error
  }
}

module.exports.removeProject = async function (ctx){
  const group = await DAOGroups.find(ctx.params.idGroups);
  if (group) {
    if (await DAOProject.find(ctx.params.idProject)) {
      await DAOGroups.updateProject(ctx.params.idGroups, null);
    } else {
      ctx.throw(401, 'User not exist'); // si il ne trouve pas alors 401 error
    }
  } else {
    ctx.throw(401, 'Group not exist'); // si il ne trouve pas alors 401 error
  }
}

module.exports.findGroup = async function (id){
  const group = await DAOGroups.findGroup(id);
  if (group){
    return new Groups(group.id, group.name, await Users.findUsersInGroups(group.id))
  }
}
