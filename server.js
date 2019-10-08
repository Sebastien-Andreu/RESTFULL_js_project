const Users = require('./routes/Users')
const Groups = require('./routes/Groups')
const Projects = require('./routes/Projects')
const authRoute = require('./routes/auth')


const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()
const koaBody = require('koa-body')

const authenticated = require('./middleware/authenticated'); // authenticated sera utiliser pour définir une authentification afin d'acceder à une route

router.post('/auth', koaBody(), authRoute); // route public pour l'authentification
// -------------- Users CRUD -------------- //

router.get('/Users', koaBody(),authenticated, Users.all)
router.get('/Users/:id', koaBody(),authenticated, Users.find)
router.post('/Users', koaBody(),authenticated, Users.add)
router.delete('/Users/:id', koaBody(), authenticated, Users.delete)
router.put('/Users/:id', koaBody(), authenticated, Users.update)

// -------------- Groups CRUD -------------- //

router.get('/Groups', koaBody(),authenticated, Groups.all) // get all groups
router.get('/Groups/:id', koaBody(),authenticated, Groups.find) // get groups with ID
router.post('/Groups', koaBody(), authenticated, Groups.add) // list of ID of Users in POST and name of groups
router.delete('/Groups/:id', koaBody(), authenticated, Groups.delete) // delete Groups with ID
router.put('/Groups/:id', koaBody(), authenticated, Groups.update) // modify Groups with ID
//
router.post('/Groups/:id/Users', koaBody(), authenticated, Users.addInGroup) // add new Users, with list or just ID in params
router.delete('/Groups/:idGroups/Users/:idUsers', koaBody(), authenticated, Users.removeInGroup) // delete Users, with list or just ID in params

// -------------- Project CRUD -------------- //

router.get('/Projects', koaBody(),authenticated, Projects.all)
router.get('/Projects/:id', koaBody(),authenticated, Projects.find)
router.post('/Projects', koaBody(), authenticated, Projects.add)
router.delete('/Projects/:id', koaBody(), authenticated, Projects.delete)
router.put('/Projects/:id', koaBody(), authenticated, Projects.update)

router.post('/Projects/:id/Groups', koaBody(), authenticated, Groups.addProject) // add new Users, with list or just ID in params
router.delete('/Projects/:idProject/Groups/:idGroups', koaBody(), authenticated, Groups.removeProject) // delete Users, with list or just ID in params

// faut changer les Users dans les groupes, a chaque fois que l'on ajouter un user dans un groupe, il faut remplir la liste des users qu'il y a dans ce groupe
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)
