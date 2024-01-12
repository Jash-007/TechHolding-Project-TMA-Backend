const { Router } = require('express')
const route=  Router();
const cnttask = require('../Controller/task');
route.get('/',cnttask.gettask);
route.post('/',cnttask.addtask);
route.get('/:id',cnttask.getbyid);
route.delete('/:id',cnttask.deltask);
route.put('/:id',cnttask.updatetask);
module.exports=route;
