const addDev="Insert into developers (demail,dname,dpass,drole) values($1, $2, $3,$4)";
const delDev="Delete from developers where did=$1";
const viewDevById="Select * from developers where did=$1";
const viewDev="Select * from developers where drole='developer'";
const updateDev="Update developers set dname=$1,demail=$2,dpass=$3,drole=$4  where did=$5";
const loginDev='SELECT * FROM developers WHERE demail = $1';
const viewByRole = `SELECT * FROM developers WHERE drole = $1`;
const countDev="Select count(*) from developers where drole='developer'";
const countAdmin="select count(*) from developers where drole='admin'";
const viewLess="select * from developers where drole='developer' ORDER BY did DESC LIMIT 3";

module.exports ={
    addDev,
    delDev,
    viewDev,
    updateDev,
    viewDevById,
    loginDev,
    viewByRole,
    countDev,
    countAdmin,
    viewLess 
}