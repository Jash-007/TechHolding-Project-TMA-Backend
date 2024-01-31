const pool = require("../config.js");
const query = require("../Queries/Developer.js");
const bcrypt = require("bcryptjs");
const jwtKey = process.env.JWT_Key;
const jwt = require("jsonwebtoken");

const getDev = async (req, res) => {
    try {
        const result=await pool.query(query.viewDev);
        res.send({ results: result });
    } catch (error) {
        res.status(500).send({ results: { error: error } });
    }
};
const countDev = async (req, res) => {
    try {
        const result=await pool.query(query.countDev);
        res.send({ results: result });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error"});
    }
};
// Get by role function return list based on role
const getByRole = async (req, res) => {
    try {
        const { drole } = req.params;
        const result=await pool.query(query.viewByRole, [drole]);     
        res.send({ results: result });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const addDev = async (req, res) => {
    try {
        const { demail, dname, dpass, drole } = req.body;
        const hashedPassword = await bcrypt.hash(dpass, 10);
        const result = await pool.query(query.addDev, [
            demail,
            dname,
            hashedPassword,
            drole,
        ]);
        res.status(201).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const login = async (req, res) => {
    const { demail, dpass } = req.body;
    console.log(demail, dpass);
    try {
        const result = await pool.query(query.loginDev, [demail]);
        if (result.rows.length === 0) {
            return res
                .status(401)
                .json({ error: "Invalid credentials!!!!!!!!!!!!!" });
        }
        // console.log(result);
        const user = result.rows[0];
        // console.log(user);
        const isPasswordValid = await bcrypt.compare(dpass, user.dpass);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ email: user.demail }, jwtKey);
        return res.status(200).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const getById =  async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(query.viewDevById, [id]);
        res.send(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//api for displaying 3 entry as per the UI
const viewLess = async (req, res) => {
    try {
        const result = await pool.query(query.viewLess);
        res.send({ results: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const delDev = async (req, res) => {
    const { id } = req.params;
    try {
        const idPresent= await pool.query(query.viewDevById, [id]);
        if(!idPresent){
            res.status(404).json({error: "User not fond"});
        }
        else{
            const result = await pool.query(query.delDev, [id]);
            res.send(result.rows);
        }
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
};
const updateDev = async (req, res) => {
    const { id } = req.params;
    try {
        const { dname, demail, dpass, drole } = req.body;
        const idPresent=pool.query(query.viewDevById, [id]);
        if(!idPresent){
            res.status(404).json({error: "User not fond"});
        }    
        else{
            let securePass = bcrypt.hashSync(dpass);
            const result= await pool.query(query.updateDev,[dname, demail, securePass, drole, id],);
            res.send(result);
        }
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
};
const countAdmin = async (req, res) => {
    try {
        const result=await pool.query(query.countAdmin);
        res.send({results: result});
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
};
module.exports = {
    getDev,
    addDev,
    getById,
    delDev,
    updateDev,
    login,
    getByRole,
    countDev,
    countAdmin,
    viewLess,
};
