const Api = require("../models/api.model");
const User = require("../models/user.model");
const apiUtils = require("../utils/api.utils");

exports.createApi = function(req, res){
    console.log("Create api");
    if(req.body.user == null)
        return res.send("user not found");
        
    if(req.body.user.id == null)
        return res.send("user id not found");
    
    
    if(req.body.applicationName == null)
            return res.send("application name is missing");


    User.findOne({ id : req.body.user.id }, function(err, user){
        if(err)
           return res.send(err);

        else {   
            Api.findOne({ applicationName : req.body.applicationName}, function(err, a){
                if(err)
                    return res.send(err);

                if(a != undefined)
                    return res.send("user has already an app name " + req.body.applicationName);

                var key = apiUtils.generateKey(req.body.applicationName);
                let api = new Api({
                    key: key,
                    applicationName: req.body.applicationName,
                    userId: req.body.user.id
                });
    
                api.save(function(err){
                    if(err)
                        return res.send(err);
                    else
                        return  res.send(api);
                });
                
            });  
        }
    })

}

exports.getApi = function(req, res){
    if(req.params == null)
        return res.send("user not found");

    if(req.params.pseudo == null)
        return res.send("user pseudo not found");
    
    User.findOne({ pseudo : req.params.pseudo }, function(err, user){
        if(err)
            return res.send(err);
        
        if(user == null)
            return res.send("no user found with " + req.params.pseudo);

        Api.find({ userId : user._id }, function(err, as){
        if(err)
            return res.send(err);
        
        return res.send(as);
        });
    });
}