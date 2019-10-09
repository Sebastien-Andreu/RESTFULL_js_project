const Users = require('./routes/Users')
const Groups = require('./routes/Groups')
const Projects = require('./routes/Projects')
const authRoute = require('./routes/auth')


const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()
const koaBody = require('koa-body')
const authenticated = require('./middleware/authenticated'); // use to verify token
const authorization = require('./middleware/authorization'); // use to verify acces


router.post('/auth', koaBody(), authRoute);

// -------------- Users CRUD -------------- //

router.get('/Users', koaBody(),authenticated, Users.all)
router.get('/Users/:id', koaBody(),authenticated, Users.find)
router.post('/Users', koaBody(),authenticated, authorization, Users.add)
router.delete('/Users/:id', koaBody(), authenticated, authorization, Users.delete)
router.put('/Users/:id', koaBody(), authenticated, authorization, Users.update)

// -------------- Groups CRUD -------------- //

router.get('/Groups', koaBody(),authenticated, Groups.all)
router.get('/Groups/:id', koaBody(),authenticated, Groups.find)
router.post('/Groups', koaBody(), authenticated, authorization, Groups.add)
router.delete('/Groups/:id', koaBody(), authenticated, authorization, Groups.delete)
router.put('/Groups/:id', koaBody(), authenticated, authorization, Groups.update)

router.post('/Groups/:id/Users', koaBody(), authenticated, authorization, Users.addInGroup)
router.delete('/Groups/:idGroups/Users/:idUsers', koaBody(), authenticated, authorization, Users.removeInGroup)

// -------------- Project CRUD -------------- //

router.get('/Projects', koaBody(),authenticated, Projects.all)
router.get('/Projects/:id', koaBody(),authenticated, Projects.find)
router.post('/Projects', koaBody(), authenticated, authorization, Projects.add)
router.delete('/Projects/:id', koaBody(), authenticated, authorization, Projects.delete)
router.put('/Projects/:id', koaBody(), authenticated, authorization, Projects.update)

router.post('/Projects/:id/Groups', koaBody(), authenticated, authorization, Groups.addProject)
router.delete('/Projects/:idProject/Groups/:idGroups', koaBody(), authenticated, authorization, Groups.removeProject)

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)
