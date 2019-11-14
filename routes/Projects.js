/**
 * get all Project
 * @param ctx - The params send by user with HTML request
 */
module.exports.all = async function (ctx) {
   const DAOProject = require('../DAO/DAOProjects');
   const Groups = require('../routes/Groups');
   const Project = require('../class/Projects');

   const allProject = await DAOProject.all();
   const arrayProject = [];
   for await (let project of allProject) {
     arrayProject.push(
       new Project(project.ID, project.Name, project.Desc, await Groups.findGroup(project.ID))
     );
   }
   console.log("All Projects :");
   console.log(arrayProject);
   ctx.status = 200;
   ctx.body = arrayProject;
}

/**
 * get one Projects with id
 * @param ctx - The params send by user with HTML request
 */
module.exports.find = async function (ctx) {
  const DAOProject = require('../DAO/DAOProjects')
  const Groups = require('../routes/Groups');
  const Project = require('../class/Projects');

  const project = await DAOProject.find(ctx.params.id);
  if (project){
    ctx.status = 200;
    ctx.body = new Project(project.ID, project.Name, project.Desc, await Groups.findGroup(ctx.params.id));
    console.log("Project find ! :");
    console.log(new Project(project.ID, project.Name, project.Desc, await Groups.findGroup(ctx.params.id)));
  } else {
    ctx.throw(404, 'Project not exist');
  }
}

/**
 * add new Projects, checks that the Project does not exist
 * @param ctx - The params send by user with HTML request
 */
module.exports.add = async function (ctx) {
  const DAOProject = require('../DAO/DAOProjects')

  const { name, desc } = ctx.request.body;

  if (!name) ctx.throw(422, 'Name required.');
  if (!desc) ctx.throw(422, 'Desc required.');

  const project = await DAOProject.otherFind(name);
  if (project.length == 0){
    ctx.status = 200;
   await DAOProject.add(name, desc);
   console.log("Project added ! ( name : "+name+", desc : "+desc+")");
  } else {
   ctx.throw(404, 'Project already exist');
  }
}

/**
 * delete Project with id, checks that the Project exist
 * @param ctx - The params send by user with HTML request
 */
module.exports.delete = async function (ctx) {
  const DAOProject = require('../DAO/DAOProjects');

  if (await DAOProject.find(ctx.params.id)) {
    ctx.status = 200;
    await DAOProject.delete(ctx.params.id);
    console.log("Project deleted ! ( idProject : "+ctx.params.id+")");

  } else {
    ctx.throw(404, 'Project not exist');
  }
}

/**
 * update Project with id, checks that the Project exist
 * @param ctx - The params send by user with HTML request
 */
module.exports.update = async function (ctx) {
  const DAOProject = require('../DAO/DAOProjects');
  const Groups = require('../routes/Groups');
  const Project = require('../class/Projects');

  const { name, desc } = ctx.request.body;

  if (!name) ctx.throw(422, 'Name required.');
  if (!desc) ctx.throw(422, 'Desc required.');

  if (await DAOProject.find(ctx.params.id)) {
    await DAOProject.update(ctx.params.id, name, desc)
    ctx.status = 200;
    ctx.body = new Project(ctx.params.id, name, desc, await Groups.findGroup(ctx.params.id));
    console.log("Project updated ! ( "+ ctx.params.id + "," +name+","+desc +")");

  } else {
    ctx.throw(404, 'Project not exist');
  }
}
