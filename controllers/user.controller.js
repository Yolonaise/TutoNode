const User = require('../models/user.model');
const Jwt = require('jsonwebtoken');

exports.login = function(req, res){
    User.findOne({ pseudo : req.body.pseudo, password : req.body.password }, function(err, user){
        if(err){
            res.send(err);
        }
        else {
            var token = Jwt.sign({username: user.pseudo, password: user.password }, req.headers.apikey,{expiresIn: 120});
            res.send({token : token});
        }
    });
}

exports.signin = function(req, res){
    User.findOne({ email : req.body.email }, function(err, user){
        if(err){
            res.send(err);
        }
        else {
            if(user != null)
                res.send('Email is already taken');
                return;
        }
    });

    User.findOne({ pseudo : req.body.pseudo }, function(err, user){
        if(err){
            return res.send(err);
        }
        else {
            if(user != null)
                return res.send('pseudo is already taken');

            let user = new User({
                pseudo : req.body.pseudo, 
                nom : req.body.nom,
                prenom : req.body.prenom,
                email : req.body.email,
                password : req.body.password
            });
        
            user.save(function(err){
                if(err){
                    res.send(err);
                }
                else{
                    res.send('user successfully created');
                }
            });
        }
    });
}