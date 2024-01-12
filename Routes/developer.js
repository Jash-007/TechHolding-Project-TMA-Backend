const { Router } = require('express')
const route=  Router();
const cntdev = require('../Controller/developer');

route.get('/',cntdev.verifyToken, cntdev.getdev);
route.post('/',cntdev.addDev);
route.post('/login',cntdev.login)
route.get('/:id',cntdev.getbyid)
route.delete('/:id',cntdev.delDev)
route.put('/:id',cntdev.updateDev)
// route.get('/verifytoken',cntdev.verifyToken,cntdev.getdev);
module.exports=route;