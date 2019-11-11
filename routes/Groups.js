/**
 * get all Groups
 * @param ctx - The params send by user with HTML request
 */
module.exports.all = async function (ctx) {
    const DAOGroups = require('../DAO/DAOGroups');
    const Groups = require('../class/Groups');
    const Users = require('./Users');

    const allGroups = await DAOGroups.all();
    const arrayGroups = [];
    for await (let group of allGroups) {
      arrayGroups.push(new Groups(group.id, group.name, await Users.findUsersInGroups(group.id)));
    }
    console.log("All Groups :");
    console.log(arrayGroups);
    ctx.status = 200;
    ctx.body = arrayGroups;
}

/**
 * get one Group with id
 * @param ctx - The params send by user with HTML request
 */
module.exports.find = async function (ctx) {
  const DAOGroups = require('../DAO/DAOGroups');
  const Groups = require('../class/Groups');
  const Users = require('./Users');


  const group = await DAOGroups.find(ctx.params.id);
  if (group){
    ctx.status = 200;
    ctx.body = new Groups(group.id, group.name, await Users.findUsersInGroups(group.id));
    console.log("Find group :");
    console.log(new Groups(group.id, group.name, await Users.findUsersInGroups(group.id)));
  } else {
    ctx.throw(404, 'Groups not found');
  }
}

/**
 * add new Group, checks that the Group does not exist
 * @param ctx - The params send by user with HTML request
 */
module.exports.add = async function (ctx) {
  const DAOGroups = require('../DAO/DAOGroups');

  const { name } = ctx.request.body;
  if (!name) ctx.throw(422, 'Name required.');

  const group = await DAOGroups.otherFind(name);
  if (group.length == 0){
    ctx.status = 200;
    await DAOGroups.add(name);
    console.log("Group is add ! (" + name + ")");
  } else {
    ctx.throw(409, 'Groups already exist'); //conflict
  }
}

/**
 * delete Group with id, checks that the Group exist
 * @param ctx - The params send by user with HTML request
 */
module.exports.delete = async function (ctx) {
  const DAOGroups = require('../DAO/DAOGroups');
  const DAOUsers = require('../DAO/DAOUsers');
  const Users = require('./Users');


  if (await DAOGroups.find(ctx.params.id)) {
    await DAOGroups.delete(ctx.params.id);
    const allUserInThisGroup = await Users.findUsersInGroups(ctx.params.id);
    for await (let user of allUserInThisGroup){
      await DAOUsers.updateGroup(user.getId(), null);
    }
    console.log("Group is delete ! ( id : " + ctx.params.id + ")");
    ctx.status = 200;
  } else {
    ctx.throw(404, 'Group not exist');
  }
}
/**
 * update Group with id, checks that the Group exist
 * @param ctx - The params send by user with HTML request
 */
module.exports.update = async function (ctx) {
  const DAOGroups = require('../DAO/DAOGroups');

  const { name } = ctx.request.body;
  if (!name) ctx.throw(422, 'Name required.');

  if (await DAOGroups.find(ctx.params.id)) {
    ctx.status = 200;
    console.log("Group updated ! (" + name + ")");
    await DAOGroups.update(ctx.params.id, name);
  } else {
    ctx.throw(404, 'Group not exist');
  }
}

/**
 * add Group in Project, checks that the Group and Project exist
 * @param ctx - The params send by user with HTML request
 */
module.exports.addProject = async function (ctx){
  const DAOGroups = require('../DAO/DAOGroups');
  const DAOProject = require('../DAO/DAOProjects');

  const { idGroup } = ctx.request.body;
  if (!idGroup) ctx.throw(422, 'id of Group required.');

  const project = await DAOProject.find(ctx.params.id);
  if (project) {
    if (await DAOGroups.find(idGroup)) {
      ctx.status = 200;
      await DAOGroups.updateProject(idGroup, project.ID);
      console.log("Group is added in project ! ( id Group " + idGroup+", id Project "+ctx.params.id +")");
    } else {
      ctx.throw(404, 'User not exist');
    }
  } else {
    ctx.throw(404, 'Group not exist');
  }
}

/**
 * remove Group in Project, checks that the Group and Project exist
 * @param ctx - The params send by user with HTML request
 */
module.exports.removeProject = async function (ctx){
  const DAOGroups = require('../DAO/DAOGroups');
  const DAOProject = require('../DAO/DAOProjects');

  const group = await DAOGroups.find(ctx.params.idGroups);
  if (group) {
    if (await DAOProject.find(ctx.params.idProject)) {
      await DAOGroups.updateProject(ctx.params.idGroups, null);
      console.log("Group is deleted in project ! ( id Group " + ctx.params.idGroups+", id Project "+ctx.params.idProject +")");
    } else {
      ctx.throw(404, 'User not exist');
    }
  } else {
    ctx.throw(404, 'Group not exist');
  }
}

/**
 * return all Group in Project with the id of Project
 * @param {int} id - The id of Group
 */
module.exports.findGroup = async function (id){
  const DAOGroups = require('../DAO/DAOGroups');
  const Groups = require('../class/Groups');
  const Users = require('./Users');

  const group = await DAOGroups.findGroup(id);
  if (group){
    return new Groups(group.id, group.name, await Users.findUsersInGroups(group.id))
  }
}
