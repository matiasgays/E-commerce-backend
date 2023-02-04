const express = require('express');
const userRouter = express.Router();
const { userModel } = require('../models/userModel');

userRouter.get('/', async (req, res) => {
    try {
        let users = await userModel.find();
        res.send({
            result: "success",
            payload: users
        })
    } catch (err) {
        throw new Error(err);
    }
})

userRouter.post('/', async (req, res) => {
    const { name, lastName, email } = req.body;
    if (!name | !lastName | !email) return res.send({
        status: "error",
        error: "Incomplete values"
    });
    let result = await userModel.create({
        name,
        lastName,
        email
    });
    res.send({
        status: "success",
        payload: result
    }
    )
})

userRouter.put('/:uid', async (req, res) => {
    const { uid } = req.params;
    const { name, lastName, email } = req.body;
    console.log(req.body);
    if (!name | !lastName | !email) return res.send({
        status: "error",
        error: "Incomplete values"
    });
    const result = await userModel.updateOne({_id: uid}, req.body);
    res.send({
        status: "success",
        payload: result
    });
})

userRouter.delete('/:uid', async (req, res) => {
    const { uid } = req.params;
    const result = await userModel.deleteOne({_id: uid});
    res.send({
        status: "success",
        payload: result
    });
})

module.exports = {
    userRouter
}