const Api = require("../models/api.model");

module.exports = function(req, res, next){
    console.log("API interceptor");
    if(req.headers == null)
        return res.send("missing params");

    if(req.headers.apikey == null)
        return res.send("apikey not found");

    Api.findOne({ key : req.headers.apikey }, function(err, api){
        if(err)
            return res.send(err);
        
        if(api == null)
            return res.send("api is not valid");

        next();
    });
};