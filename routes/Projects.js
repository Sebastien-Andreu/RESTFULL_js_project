const DAOProject = require('../DAO/DAOProjects')
const DAOGroups = require('../DAO/DAOGroups')
const Groups = require('../routes/Groups');
const Project = require('../class/Projects');

const authenticated = require('../middleware/authenticated'); // authenticated sera utiliser pour définir une authentification afin d'acceder à une route

module.exports.all = async function (ctx) {
   const allProject = await DAOProject.all();
   const arrayProject = [];
   for await (let project of allProject) {
     arrayProject.push(
       new Project(project.Name, project.Desc, await Groups.findGroup(project.ID))
     );
     console.log(arrayProject);
   }
   ctx.body = arrayProject; //arrayUsers[0].getNom
}

module.exports.find = async function (ctx) {
  const project = await DAOProject.find(ctx.params.id);
  if (project){
    ctx.body = new Project(project.Name, project.Desc, await Groups.findGroup(ctx.params.id));
  } else {
    ctx.throw(401, 'Project not exist');
  }
}

module.exports.add = async function (ctx) {
  if (await authorization(ctx)){
     const { name, desc } = ctx.request.body; //recupere les données du POST

     if (!name) ctx.throw(422, 'Name required.'); // si il n'y a pas d'username alors 422 error
     if (!desc) ctx.throw(422, 'Desc required.'); // si il n'y a pas de password alors 422 error

     const project = await DAOProject.otherFind(name);
     if (project.length == 0){
       await DAOProject.add(name, desc);
     } else {
       ctx.throw(401, 'Project already exist'); // si il ne trouve pas alors 401 error
     }
 } else {
   ctx.throw(403, 'token verified but not access'); // si il ne trouve pas alors 401 error
 }
}

module.exports.delete = async function (ctx) {
  if (await authorization(ctx)){
      if (await DAOProject.find(ctx.params.id)) {
        await DAOProject.delete(ctx.params.id);
      } else {
        ctx.throw(401, 'Project not exist'); // si il ne trouve pas alors 401 error
      }
  } else {
    ctx.throw(403, 'token verified but not access'); // si il ne trouve pas alors 401 error
  }
}

module.exports.update = async function (ctx) {
  if (await authorization(ctx)){
      const { name, desc } = ctx.request.body; //recupere les données du POST

      if (!name) ctx.throw(422, 'Name required.'); // si il n'y a pas d'username alors 422 error
      if (!desc) ctx.throw(422, 'Desc required.'); // si il n'y a pas de password alors 422

      if (await DAOProject.find(ctx.params.id)) {
        await DAOProject.update(ctx.params.id, name, desc)
        ctx.body = new Project(name, desc, await Groups.findGroup(ctx.params.id));
      } else {
        ctx.throw(401, 'Project not exist'); // si il ne trouve pas alors 401 error
      }
  } else {
    ctx.throw(403, 'token verified but not access'); // si il ne trouve pas alors 401 error
  }
}
