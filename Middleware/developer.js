const isdev=async (req,res,next)=>{
    try{
        const detail=req?.detail;
        if(detail.drole==="developer"){
            next();
        }
    }
    catch(err){
        res.status(401).json({error:err})
    }
}
module.exports={isdev};