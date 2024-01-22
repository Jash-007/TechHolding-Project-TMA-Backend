const { Router } = require('express')
const route=  Router();
const cntdev = require('../Controller/developer');
const authmiddleware=  require('../Middleware/authorize')
const admin=require('../Middleware/admin');
route.post('/login',cntdev.login)
route.get('/count',cntdev.count)
route.get('/countadmin',cntdev.countadmin)
route.use(authmiddleware.verifyToken);
route.get('/',admin.isadmin,cntdev.getdev);
route.post('/',cntdev.addDev);
// Router.get('/:drole',cntdev.getyrole)
route.get('/:id',cntdev.getbyid)
route.delete('/:id',cntdev.delDev)
route.put('/:id',cntdev.updateDev)
// route.get('/verifytoken',cntdev.verifyToken,cntdev.getdev);
module.exports=route;