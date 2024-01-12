const pool=require('../config.js')

const query=require('../Queries/task.js')

const gettask =(req,res)=>{
    pool.query(query.viewtask,(err,result)=>{
        if(err) throw err;
        res.send(result.rows);
    })
}
const addtask =(req,res)=>{
    const {tname,tdesc,tstart,tend,did}=req.body;
    pool.query(query.addtask,[tname,tdesc,tstart,tend,did],(err,result)=>{
        if(err) throw err;
        res.send(result.rows);
    })
}

const getbyid = (req,res)=>{
    const {id}=req.params;
    pool.query(query.viewbyId,[id],(err,result)=>{
        if(err) throw err;
        res.send(result.rows);
    })
}

const deltask =(req,res)=>{
    const {id}=req.params;
    pool.query(query.viewbyId,[id],(err,result)=>{
        const nfnd=result.rows.length;
        if(!nfnd) {
        res.send("std not fond");        
    }
    else{
    pool.query(query.delDev,[id],(err,result)=>{
        if(err) throw err;
        res.send(result.rows);
        //return;
    })}})
}

const updatetask=(req,res)=>{
    const {id}=req.params;
    const {tname,tdesc,tstart,tend,did}=req.body;
    pool.query(query.viewbyId,[id],(err,result)=>{
        const nfnd=!result.rows.length;
        if(nfnd) {
        res.send("std not fond");        
    }
    else{
    pool.query(query.updatetask,[tname,tdesc,tstart,tend,did,id],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })}
})
}
module.exports={
    gettask,
    addtask,
    getbyid,
    deltask,
    updatetask
}