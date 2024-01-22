const addDev="Insert into developers (demail,dname,dpass,drole) values($1, $2, $3,$4)";
const delDev="Delete from developers where did=$1";
const viewDevbyId="Select * from developers where did=$1";
const viewDev="Select * from developers";
const updateDev="Update developers set dname=$1,demail=$2,dpass=$3,drole=$4  where did=$5";
const loginDev='SELECT * FROM developers WHERE demail = $1';
const veiwbyrole = `SELECT * FROM developers WHERE drole = $1`;
const count="Select count(*) from developers where drole='developer'";
const countadmin="select count(*) from developers where drole='admin'";
module.exports ={
    addDev,
    delDev,
    viewDev,
    updateDev,
    viewDevbyId,
    loginDev,
    veiwbyrole,
    count,
    countadmin 
}