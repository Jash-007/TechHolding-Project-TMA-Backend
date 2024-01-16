const isadmin= async (req,res,next)=>{
    try{
        const detail=req?.detail;
        if(detail.drole==="admin"){
            next();
        }
    }
    catch(err){
        res.status(401).json({error:err})
    }
}
module.exports={isadmin};