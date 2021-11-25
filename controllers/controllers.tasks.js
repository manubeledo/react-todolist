const repository = require('../models/repository')

const render = async (req, res) => {
    try{
        let tasks = await repository.showTasks()
        res.send(tasks)
    } catch (err){
        res.status(400).json(err.message)
    }
}

const create = async (req, res) => {
    try{
        await repository.addTask(req.body)
        res.send("Task saved")
    } catch (err){
        res.status(400).json(err.message)
    }
}

const edit = async (req, res) => {
    try{
        { id = req.body.id, newTask = req.body.text }
        await repository.editTask(id, newTask)
        res.send("Actualizado")
    } catch (err){
        res.status(400).json(err.message)
    }
}

const deleted = async (req, res) => {
    try{
        await repository.deleteTask(req.body.id)
        res.send('ok delete')
    } catch (err){
        res.status(400).json(err.message)
    }
}

const check = async (req, res) => {
    try{
        await repository.updateTask(req.body.id, req.body.check)
        res.send('check ok')
    } catch (err){
        res.status(400).json(err.message)
    }
}

module.exports = {
    create,
    check,
    edit,
    deleted,
    render
}

