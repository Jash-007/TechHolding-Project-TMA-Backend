const pool=require('../config.js')
const query=require('../Queries/Developer.js')
const bcrypt = require('bcryptjs')
const jwtkey="hahahahaha"

const jwt = require('jsonwebtoken');
const getdev =async (req,res)=>{
    await pool.query(query.viewDev,(err,result)=>{
        if(err) throw err;
        res.send({results: result});
    })
}
const count=async(req,res)=>{
    await pool.query(query.count,(err,result)=>{
        if(err) throw err;
        res.send({results: result});
    })
}
const getyrole=(req,res)=>{
    const {drole}=req.params;
    pool.query(query.veiwbyrole,[drole],(err,result)=>{
        if(err) throw err;
        res.send(result.rows);
    })
}
const addDev=async (req,res)=>{
    try {
        const { demail, dname, dpass, drole } = req.body;
        const hashedPassword = await bcrypt.hash(dpass, 10);
        const result = await pool.query(
           query.addDev, [demail, dname, hashedPassword, drole]
        );
       
        
        res.status(201).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const login=async (req,res)=>{
    const {demail,dpass}=req.body;
    try{
    const result=await pool.query(query.loginDev,[demail]);
    if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials!!!!!!!!!!!!!' });
    }
    const user = result.rows[0];
    console.log(user);
    const isPasswordValid = await bcrypt.compare(dpass, user.dpass);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ email: user.demail }, jwtkey);
    console.log(token);
     
    res.status(200).json({ user,token });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}   
}

const getbyid = (req,res)=>{
    const {id}=req.params;
    pool.query(query.viewDevbyId,[id],(err,result)=>{
        if(err) throw err;
        res.send(result.rows);
    })
}
const delDev =(req,res)=>{
    const {id}=req.params;
    pool.query(query.viewDevbyId,[id],(err,result)=>{
        const nfnd=result.rows.length;
        if(!nfnd) {
        res.send("std not fond");
            
    
    }
    else{
    pool.query(query.delDev,[id],(err,result)=>{
        if(err) throw err;
        res.send(result.rows);
        //return;
    })}
})
}
const updateDev=(req,res)=>{
    const {id}=req.params;
    const {dname,demail,dpass,drole}=req.body;
    pool.query(query.viewDevbyId,[id],(err,result)=>{
        const nfnd=!result.rows.length;
        if(nfnd) {
        res.send("std not fond");
            
    
    }
    else{
        let securePass= bcrypt.hashSync(dpass);
        pool.query(query.updateDev,[dname,demail,securePass,drole,id],(err,result)=>{
            if(err) throw err;
            res.send(result);
        })
    }
})
}
const countadmin=async(req,res)=>{
    await pool.query(query.countadmin,(err,result)=>{
        if(err) throw err;
        res.send({results: result});
    })
}
module.exports={
    getdev,
    addDev,
    getbyid,
    delDev,
    updateDev,
    login,
    getyrole,
    count,
    countadmin
}