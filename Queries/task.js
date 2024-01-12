const addtask="Insert into tasks(tname,tdesc,tstart,tend,did) values ($1,$2,$3,$4,$5)"
const viewtask="select * from tasks"
const viewbyId = "select * from tasks where id=$1";
const deltask="delete from tasks where id=$1";
const updatetask="update tasks set tname=$1,tdesc=$2,tstart=$3,tend=$4,did=$5 where id=$6";
module.exports={
    addtask,
    viewtask,
    viewbyId,
    deltask,
    updatetask
}