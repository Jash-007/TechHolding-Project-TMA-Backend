const addtask="Insert into tasks(tname,tdesc,tstatus,dname,did) values ($1,$2,$3,$4,$5)"
const viewall='select * from tasks'
const viewtask="select * from tasks ORDER BY tid DESC LIMIT 3"
const viewbyId = "select * from tasks where tid=$1";
const deltask="delete from tasks where tid=$1";
const updatetask="update tasks set tname=$1,tdesc=$2,tstatus=$3,dname=$4,did=$5 where tid=$6";
const getTaskByUserId = `SELECT * FROM TASKS WHERE tid = $1 AND did = $2`;
const count ='select count(*) from  tasks';
const getalltaskbyuserid='SELECT T.*, d.demail, d.dname, d.dpass, d.drole FROM tasks T INNER JOIN developers d ON T.did = d.did WHERE T.did = $1';
module.exports={
    addtask,
    viewtask,
    viewbyId,
    deltask,
    updatetask,
    getTaskByUserId,
    getalltaskbyuserid ,
    viewall,
    count
}