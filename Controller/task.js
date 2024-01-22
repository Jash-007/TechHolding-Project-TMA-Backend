const pool = require('../config.js')

const query =  require('../Queries/task.js')

const gettask = async (req, res) => {
    await pool.query(query.viewtask, (err, result) => {
        if (err) throw err;
        res.send({results: result});
    })
}
const addtask =async (req, res) => {
    const { tname, tdesc, tstatus, dname, did } = req.body;
    await pool.query(query.addtask, [tname, tdesc, tstatus, dname, did], (err, result) => {
        if (err) throw err;
        res.send(result.rows);
    })
}

const getbyid = async (req, res) => {
    const { id } = req.params;
    await pool.query(query.viewbyId, [id], (err, result) => {
        if (err) throw err;
        res.send(result.rows);
    })
}

const deltask = async (req, res) => {
    const { id } = req.params;
    await pool.query(query.viewbyId, [id], (err, result) => {
        const nfnd = result.rows.length;
        if (!nfnd) {
            res.send("std not fond");
        }
        else {
            pool.query(query.deltask, [id], (err, result) => {
                if (err) throw err;
                res.send(result.rows);
                //return;
            })
        }
    })
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
        return res
            .status(500)
            .json({ message: "Internal Server Error", errorMessage: error.message });
    }
} 
const getalltaskbyuserid =(req,res)=>{
    const { did } = req.params;
    pool.query(query.getalltaskbyuserid, [did], (err, result) => {
        if (err) throw err;
        res.send(result.rows);
    })
}
const updatetask =async (req, res) => {
    const { tid } = req.params;
    const { tname, tdesc, tstatus, dname, did } = req.body;
    await pool.query(query.viewbyId, [tid], (err, result) => {
        const nfnd = result.rows.length;
        if (!nfnd) {
            res.send("std not fond");
        }
        else {
            pool.query(query.updatetask, [tname, tdesc, tstatus, dname, did, tid], (err, result) => {
                if (err) throw err;
                res.send(result);
            })
        }
    })
}
const viewAll = async(req,res)=>{
    await pool.query(query.viewall, (err, result) => {
        if (err) throw err;
        res.send({results: result});
    })
}
const count =async(req,res)=>{
    await pool.query(query.count, (err, result) => {
        if (err) throw err;
        res.send({results: result});
    })
}
module.exports = {
    gettask,
    addtask,
    getbyid,
    deltask,
    updatetask,
    getTaskByUserId,
    getalltaskbyuserid,
    viewAll,
    count 
}