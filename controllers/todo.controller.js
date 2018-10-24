const Todo = require('../models/todo.model');

exports.getAll = function (req, res) {
    Todo.find(function (err, todo) {
        if (err) {
            return res.send(err);
        }
        else{
            res.send(todo);
        }
    })
};

exports.create = function(req, res){
    let todo = new Todo(
        {
            nom : req.body.nom,
            description : req.body.description,
            done : req.body.done
        }
    );

    todo.save(function (err) {
        if (err) {
            res.send((err));
        }
        else{
            res.send('Todo Created successfully');
        }
    })
}

exports.makeDone = function(req, res) {
    Todo.findOneAndUpdate({ id : req.params.id}, {$set: { done : true }}, function (err, product) {
        if (err){
            res.send(err);
        } 
        else {
            res.send('Todo udpated.');
        }
    });
}

exports.delTodo = function(req, res){
    Todo.findOneAndDelete({ id : req.params.id}, function(err){
        if(err){
            res.send(err);
        }
        else {
            res.send('Todo successfully deleted');
        }
    });
}