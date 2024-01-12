const addDev="Insert into developers (dname,demail,dpass,drole) values($1, $2, $3,$4)";
const delDev="Delete from developers where did=$1";
const viewDevbyId="Select * from developers where did=$1";
const viewDev="Select * from developers";
const updateDev="Update developers set dname=$1,demail=$2,dpass=$3,drole=$4  where did=$5";
const loginDev='SELECT * FROM developers WHERE demail = $1'
module.exports ={
    addDev,
    delDev,
    viewDev,
    updateDev,
    viewDevbyId,
    loginDev 
}