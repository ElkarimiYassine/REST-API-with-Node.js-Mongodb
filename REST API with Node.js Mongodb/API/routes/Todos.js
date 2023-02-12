const express = require('express');
const router = express.Router();
const Todos = require('../../models/todos');
const mongoose = require('mongoose');

router.get('/',(req,res,next)=>{
    Todos.find()
         .select('_id userId id title completed')
         .exec()
         .then(doc =>  {
            const result = {
                Todos: doc
            }
            res.status(200).json(result);
         })
         .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            })
         })
})

router.post('/',(req,res,next)=>{
    const Todo = new Todos({
        userId : req.body.userId,
        id : req.body.id,
        title : req.body.title,
        completed : req.body.completed 
    });

    Todo
        .save()
        .then(result => {
             console.log(result);
             res.status(201).json({
                message: 'Handling POST req to /todos',
                Todos: result
            })
            })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
})

router.get('/:TodoId',(req,res,next) => {
    const id = req.params.TodoId;
    Todos.findById(id)
         .select('_id userId id title completed')
         .exec()
         .then(doc => {
            if(doc){
                const result = {
                    Todos: doc
                }
                res.status(200).json(result);
            }else{
                res.status(404)
                   .json({message: "ID is not valid"}) 
            }
         })
         .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
         })
})

router.patch('/:TodoId',(req,res,next) => {
    const id = req.params.TodoId;
    const updateOp ={};
    for (const Op of req.body){
        updateOp[Op.TodoTitle] = Op.value;
    }
    Todos.update({_id:id},{$set: updateOp})
         .exec()
         .then(result => {
            console.log(result);
            res.status(200).json(result);
         })
         .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
         })
})

router.delete('/:TodoId',(req,res,next) => {
    const id = req.params.TodoId;
    Todos.remove({_id : id})
         .exec()
         .then( result =>  {
            res.status(200).json(result);
         })
         .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
         })
})

module.exports = router;