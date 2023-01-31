import express from 'express';
import studentModel from '../models/studentModel.js'

const studentRouter = express.Router();

studentRouter.get('/', async (req, res) => {
    try {
        const result = await studentModel.find();
        res.send({
            status: "success",
            payload: result
        })
    } catch (err) {
        throw new Error(err);
    }
})

studentRouter.post('/', async (req, res) => {
    try {
        const { name, lastName, age, ID, course, grade } = req.body;
        if (!name | !lastName | !age | !ID | !course | !grade) return res.send({
            status: "error",
            error: "Incomplete values"
        })
        let result = await studentModel.create({
            name,
            lastName,
            age,
            ID,
            course,
            grade
        });
        res.send({
            status: "success",
            payload: result
        });
    } catch (err) {
        throw new Error(err);
    }
})

export default studentRouter;