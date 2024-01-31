const pool = require('../config.js')

const query =  require('../Queries/task.js')

const getTask = async (req, res) => {
    try {
        const result=await pool.query(query.viewTask);
        res.send({results: result});
    } catch (error) {
        res.status(500).json({error: "Internal Server"});
    }
}
const addTask =async (req, res) => {
    const { tname, tdesc, tstatus, dname, did } = req.body;
    try {
        const result=await pool.query(query.addTask, [tname, tdesc, tstatus, dname, did]);
        res.send(result.rows);
    } catch (error) {
        res.status(500).json({error: "Internal Server"});
    }
}
//API call return task by its Id
const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const result= await pool.query(query.viewById, [id])
        res.send(result.rows);
    } catch (error) {
        res.status(500).send({error: "Internal Server Error"});
    }
}

const delTask = async (req, res) => {
    const { id } = req.params;
    try {
        const idPresent=await pool.query(query.viewById, [id])
        if(!idPresent){
            res.status(404).json({
                message: "resource does not found!",
            });
            return
        }
        else{
            pool.query(query.delTask, [id])
            res.send(result.rows);
            return;
        }
    } catch (error) {
        res.status(500).send({error: "Internal Server Error"});
    }
}
async function getTaskByUserId(req, res) {
    const { id, did } = req.params;
    try {
        let records = await pool.query(getTaskByUserId, [id, did]);
        if (!records.rowCount) {
            return res.status(404).json({
                message: "resource does not found!",
            });
        }
        return res.status(200).json(records.rows);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", errorMessage: error.message });
    }
} 
const getAllTaskByUserId =async (req,res)=>{
    const  did  = req.params.did;
    // console.log(req.params.did);
    try {
        const result=await pool.query(query.getAllTaskByUserId, [did])
        // console.log(result);
        res.send(result.rows);
    } catch (error) {
        res.status(500).send({error: "Internal Server Error"});
    }
}
const updateTask =async (req, res) => {
    const { tid } = req.params;
    const { tname, tdesc, tstatus, dname, did } = req.body;
    try {
        const idPresent= await pool.query(query.viewById, [tid]) 
        if(!idPresent){
            res.status(404).json({
                message: "resource does not found!",
            });
            return
        }
        else{
            const result=await pool.query(query.updateTask, [tname, tdesc, tstatus, dname, did, tid])
            res.send(result);
            return
        }
    } catch (error) {
        res.status(500).send({error: "Internal Server Error"});
    }
}
const viewAll = async(req,res)=>{
    try {
        const result=await pool.query(query.viewAll)
        res.send({results: result});
    } catch (error) {
        res.status(500).send({error: "Internal Server Error"});
    }
}
const countTask =async(req,res)=>{
    try {
        const result=await pool.query(query.countTask)   
        res.send({results: result});
    } catch (error) {
        res.status(500).send({error: "Internal Server Error"});
    }
}
module.exports = {
    getTask,
    addTask,
    getById,
    delTask,
    updateTask,
    getTaskByUserId,
    getAllTaskByUserId,
    viewAll,
    countTask 
}