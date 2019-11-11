/**
 * get all Users
 * @param ctx - The params send by user with HTML request
 */
module.exports.all = async function (ctx) {
   const DAOGroups = require('../DAO/DAOGroups');
   const Users = require('../class/Users');

   const allUsers = await DAOUsers.all();
   const arrayUsers = [];
   for await (let user of allUsers) {
     arrayUsers.push(new Users(user.ID, user.Name, user.Surname));
   }
   console.log("all Users :");
   console.log(arrayUsers);
   ctx.status = 200;
   ctx.body = arrayUsers;
}

/**
 * get one User with id
 * @param ctx - The params send by user with HTML request
 */
module.exports.find = async function (ctx) {
  const DAOUsers = require('../DAO/DAOUsers');
  const Users = require('../class/Users');

  const user = await DAOUsers.find(ctx.params.id);
  if (user){
    ctx.status = 200;
    ctx.body = new Users(user.ID, user.Name, user.Surname);
    console.log("User find ! " + new Users(user.ID, user.Name, user.Surname));
  } else {
    ctx.throw(404, 'User not exist');
  }
}

/**
 * add new User, checks that the User does not exist
 * @param ctx - The params send by user with HTML request
 */
module.exports.add = async function (ctx) {
   const DAOUsers = require('../DAO/DAOUsers');

   const { name, surname } = ctx.request.body;

   if (!name) ctx.throw(422, 'Name required.');
   if (!surname) ctx.throw(422, 'Surname required.');

   const user = await DAOUsers.otherFind(name, surname);
   if (user.length == 0){
     await DAOUsers.add(name, surname);
     ctx.status = 200;
     console.log("User added ! ("+name+ ", "+surname+")");
   } else {
     ctx.throw(409, 'User already exist'); //conflict
   }
}

/**
 * delete User with id, checks that the User exist
 * @param ctx - The params send by user with HTML request
 */
module.exports.delete = async function (ctx) {
  const DAOUsers = require('../DAO/DAOUsers');

  if (await DAOUsers.find(ctx.params.id)) {
    await DAOUsers.delete(ctx.params.id);
    ctx.status = 200;
    console.log("User deleted ! ( id :"+ctx.params.id+")");
  } else {
    ctx.throw(404, 'User not exist');
  }
}

/**
 * update User with id, checks that the User exist
 * @param ctx - The params send by user with HTML request
 */
module.exports.update = async function (ctx) {
  const DAOUsers = require('../DAO/DAOUsers');
  const Users = require('../class/Users');

  const { name, surname } = ctx.request.body;

  if (!name) ctx.throw(422, 'Name required.');
  if (!surname) ctx.throw(422, 'Surname required.');

  if (await DAOUsers.find(ctx.params.id)) {
    await DAOUsers.update(ctx.params.id, name, surname)
    ctx.status = 200;
    ctx.body = new Users(ctx.params.id, name, surname);
    console.log("User updated ! ("+new Users(ctx.params.id, name, surname)+")");
  } else {
    ctx.throw(404, 'User not exist');
  }
}

/**
 * add User in Group, checks that the User and Group exist
 * @param ctx - The params send by user with HTML request
 */
module.exports.addInGroup = async function (ctx){
  const DAOGroups = require('../DAO/DAOGroups');
  const DAOUsers = require('../DAO/DAOUsers');

  const { idUser } = ctx.request.body;
  if (!idUser) ctx.throw(422, 'id of User required.');

  const group = await DAOGroups.find(ctx.params.id);
  if (group) {
    if (await DAOUsers.find(idUser)) {
      await DAOUsers.updateGroup(idUser, group.id);
      ctx.status = 200;
      console.log("User added in Group ( idUser :"+idUser+", idGroup :"+group.id+")");
    } else {
      ctx.throw(404, 'User not exist');
    }
  } else {
    ctx.throw(404, 'Group not exist');
  }
}

/**
 * remove User in Group, checks that the User and Group exist
 * @param ctx - The params send by user with HTML request
 */
module.exports.removeInGroup = async function (ctx){
  const DAOGroups = require('../DAO/DAOGroups');
  const DAOUsers = require('../DAO/DAOUsers');

  const group = await DAOGroups.find(ctx.params.idGroups);
  if (group) {
    if (await DAOUsers.find(ctx.params.idUser)) {
      await DAOUsers.updateGroup(ctx.params.idUsers, null);
      ctx.status = 200
      console.log("User removed in Group ( idUser :"+ctx.params.idUser+", idGroup :"+ctx.params.idGroups+")");
    } else {
      ctx.throw(404, 'User not exist');
    }
  } else {
    ctx.throw(404, 'Group not exist');
  }
}

/**
 * return all Users in Groups with the id of Group
 * @param {int} id - The id of Group
 */
module.exports.findUsersInGroups = async function (id){
  const DAOUsers = require('../DAO/DAOUsers');
  const Users = require('../class/Users');

  const allUsersInGroup = await DAOUsers.findInGroup(id);
  const arrayUsers = [];
  for await (let userInGroup of allUsersInGroup) {
    arrayUsers.push(new Users(userInGroup.ID, userInGroup.Name, userInGroup.Surname));
  }
  return arrayUsers;
}
