const { Router } = require('express')
const route=  Router();
const cnttask = require('../Controller/task');
route.get('/view',cnttask.viewAll);
route.get('/count',cnttask.count)
route.get('/',cnttask.gettask);
route.post('/add',cnttask.addtask);
route.get('/viewbyId/:id',cnttask.getbyid);
route.delete('/:id',cnttask.deltask);
route.put('/update/:id',cnttask.updatetask);
// route.get('/task/:did/:id',cnttask.getTaskByUserId);
route.get('/user/:did',cnttask.getalltaskbyuserid);
module.exports=route;

