const db = require("../config/db")

async function addTask(newTask){
    try {
        await db('tasks').insert(newTask)
    } 
    catch(err){
            console.log("ERROR DESDE addTask", err)
    }
}

async function showTasks(){
    try {
        let data = await db('tasks').whereNot('id', 0)
        return data
    } 
    catch(err){
        console.log("Error from showTasks", err)
    }
}

async function deleteTask(numid){
    try {
        await db('tasks').where('id', numid).del()
    } 
    catch(err){
        console.log("ERROR DESDE deleteTask",err)
    }
}

async function updateTask(numid, check){
    try {
        await db('tasks').where({ id: numid }).update({ check: !check})
    } 
    catch(err){
        console.log("ERROR DESDE updateTask",err)
    }
}

async function editTask(numid, newTask){
    try {
        await db('tasks').where({ id: numid }).update({ text: newTask})
    } 
    catch(err){
        console.log("ERROR DESDE editTask", err)
    }
}

module.exports = {
    addTask,
    showTasks,
    deleteTask,
    updateTask,
    editTask
}