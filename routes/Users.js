const DAOGroups = require('../DAO/DAOGroups')
const DAOUsers = require('../DAO/DAOUsers')
const Users = require('../class/Users');

module.exports.all = async function (ctx) {
   const allUsers = await DAOUsers.all();
   const arrayUsers = [];
   for await (let user of allUsers) {
     arrayUsers.push(new Users(user.ID, user.Name, user.Surname));
   }
   ctx.body = arrayUsers; //arrayUsers[0].getNom
}

module.exports.find = async function (ctx) {
  const user = await DAOUsers.find(ctx.params.id);
  if (user){
    ctx.body = new Users(user.ID, user.Name, user.Surname);
  } else {
    ctx.throw(401, 'User not exist');
  }
}

module.exports.add = async function (ctx) {
   const { name, surname } = ctx.request.body; //recupere les données du POST

   if (!name) ctx.throw(422, 'Nom required.'); // si il n'y a pas d'username alors 422 error
   if (!surname) ctx.throw(422, 'Prenom required.'); // si il n'y a pas de password alors 422 error

   const user = await DAOUsers.otherFind(name, surname);
   if (user.length == 0){
     await DAOUsers.add(name, surname);
   } else {
     ctx.throw(401, 'User already exist'); // si il ne trouve pas alors 401 error
   }
}

module.exports.delete = async function (ctx) {
  if (await DAOUsers.find(ctx.params.id)) {
    await DAOUsers.delete(ctx.params.id);
  } else {
    ctx.throw(401, 'User not exist'); // si il ne trouve pas alors 401 error
  }
}

module.exports.update = async function (ctx) {
  const { name, surname } = ctx.request.body; //recupere les données du POST

  if (!name) ctx.throw(422, 'Name required.'); // si il n'y a pas d'username alors 422 error
  if (!surname) ctx.throw(422, 'Surname required.'); // si il n'y a pas de password alors 422

  if (await DAOUsers.find(ctx.params.id)) {
    await DAOUsers.update(ctx.params.id, name, surname)
    ctx.body = new Users(ctx.params.id, name, surname);
  } else {
    ctx.throw(401, 'User not exist'); // si il ne trouve pas alors 401 error
  }
}

module.exports.addInGroup = async function (ctx){
  const { idUser } = ctx.request.body; //recupere les données du POST
  if (!idUser) ctx.throw(422, 'id of User required.');

  const group = await DAOGroups.find(ctx.params.id);
  if (group) {
    if (await DAOUsers.find(idUser)) {
      await DAOUsers.updateGroup(idUser, group.id);
    } else {
      ctx.throw(401, 'User not exist'); // si il ne trouve pas alors 401 error
    }
  } else {
    ctx.throw(401, 'Group not exist'); // si il ne trouve pas alors 401 error
  }
}

module.exports.removeInGroup = async function (ctx){
  const group = await DAOGroups.find(ctx.params.idGroups);
  if (group) {
    if (await DAOUsers.find(ctx.params.idUser)) {
      await DAOUsers.updateGroup(ctx.params.idUsers, null);
    } else {
      ctx.throw(401, 'User not exist'); // si il ne trouve pas alors 401 error
    }
  } else {
    ctx.throw(401, 'Group not exist'); // si il ne trouve pas alors 401 error
  }
}

module.exports.findUsersInGroups = async function (id){
  const allUsersInGroup = await DAOUsers.findInGroup(id);
  const arrayUsers = [];
  for await (let userInGroup of allUsersInGroup) {
    arrayUsers.push(new Users(userInGroup.ID, userInGroup.Name, userInGroup.Surname));
  }
  return arrayUsers; //arrayUsers[0].getNom
}
