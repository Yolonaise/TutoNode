const Todo = require('../models/todo.model');

exports.getAll = function (req, res) {
    Todo.find(function (err, todos) {
        if (err)
            return res.send({ status: 500, error: err });

        else
            return res.send({ status: 200, todos: todos });

    })
};

exports.create = function (req, res) {
    let todo = new Todo(
        {
            nom: req.body.nom,
            description: req.body.description,
            done: req.body.done
        }
    );

    todo.save(function (err, todo) {
        if (err)
            return res.send({ status: 500, error: err });

        else
            return res.send({ status: 200, todo: todo });
    })
}

exports.makeDone = function (req, res) {
    Todo.findOneAndUpdate({ id: req.params.id }, { $set: { done: true } }, function (err, todo) {
        if (err)
            return res.send({ status: 500, error: err });

        else
            return res.send({ status: 200, todo: todo });
    });
}

exports.delTodo = function (req, res) {
    Todo.findOneAndDelete({ id: req.params.id }, function (err) {
        if (err)
            return res.send({ status: 500, error: err });

        else
            return res.send({ status: 200 });
    });
}