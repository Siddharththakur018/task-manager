const Task = require('../model/Task')
const mongoose = require('mongoose');

const getTasks = async(req, res, next) => {
    try {
        const tasks = await Task.find().sort({createdAt: -1});
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({message: 'Server Error', error: error.message});
    }
}

const createTask = async (req,res,next) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({message: 'Server Error', error: error.message});
    }
}


module.exports = {getTasks, createTask}