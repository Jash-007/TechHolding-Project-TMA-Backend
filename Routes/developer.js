const { Router } = require('express')
const route=  Router();
const cntdev = require('../Controller/developer');
const authmiddleware=  require('../Middleware/authorize')
const admin=require('../Middleware/admin');
route.post('/login',cntdev.login)
route.get('/count',cntdev.count)
route.get('/countadmin',cntdev.countadmin)
route.use(authmiddleware.verifyToken);
route.get('/viewless',cntdev.viewless);
route.get('/viewall',cntdev.getdev);
route.post('/add',cntdev.addDev);
// Router.get('/:drole',cntdev.getyrole)
route.get('/viewbyid/:id',cntdev.getbyid)
route.delete('/deldev/:id',cntdev.delDev)
route.put('/update/:id',cntdev.updateDev)
// route.get('/verifytoken',cntdev.verifyToken,cntdev.getdev);
module.exports=route;