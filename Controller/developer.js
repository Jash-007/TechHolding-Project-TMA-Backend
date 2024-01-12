const pool=require('../config.js')
const query=require('../Queries/Developer.js')
const bcrypt = require('bcryptjs')
const jwtkey="hahahahaha"

const jwt = require('jsonwebtoken');
const getdev =(req,res)=>{
    pool.query(query.viewDev,(err,result)=>{
        if(err) throw err;
        res.send(result.rows);
    })
}

const addDev=async (req,res)=>{
    try {
        const { dname, demail, dpass, drole } = req.body;
        const hashedPassword = await bcrypt.hash(dpass, 10);
        const result = await pool.query(
           query.addDev, [dname, demail, hashedPassword, drole]
        );
        const user = result.rows[0];
        const token = jwt.sign({ email: demail,name: dname }, jwtkey);
        res.header('Authorization', `Bearer ${token}`);
        
        res.status(201).json({ user, token });
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
    const isPasswordValid = await bcrypt.compare(dpass, user.dpass);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ email: user.demail,name:user.dname }, jwtkey, { expiresIn: '1h' });
    res.header('Authorization', `Bearer ${token}`);
    res.status(200).json({ user, token });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}   
}
const verifyToken = (req, res, next) => {
    console.log("hello");
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), jwtkey);
        req.body.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};
const generateSession = (req, res, next) => {
    req.session.user = req.user;
    next();
};
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
module.exports={
    getdev,
    addDev,
    getbyid,
    delDev,
    updateDev,
    login,
    verifyToken,
    generateSession
}