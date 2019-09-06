const Api = require("../models/api.model");
const User = require("../models/user.model");
const apiUtils = require("../utils/api.utils");

exports.createApi = function (req, res) {
    if (req.body.userId == null)
        return res.send({ status: 401, error: "This function is available for registered account" });

    if (req.body.applicationName == null)
        return res.send({ status: 401, error: "application name is missing." });

    Api.findOne({ applicationName: req.body.applicationName }, function (err, a) {
        if (err)
            return res.send(err);

        if (a != undefined)
            return res.send({ status: 401, error: "user has already an app name " + req.body.applicationName });

        var key = apiUtils.generateKey(req.body.applicationName);
        let api = new Api({
            key: key,
            applicationName: req.body.applicationName,
            userId: req.body.userId
        });

        api.save(function (err) {
            if (err)
                return res.send({ status: 500, error: err });
            else
                return res.send({ status: 200, apikey: api });
        });

    });
}

exports.getApi = function (req, res) {
    if (req.params == null)
        return res.send({ status: 206, error: "No parameters available" });

    if (req.params.pseudo == null)
        return res.send({ status: 206, error: "User parameters not found." });

    Api.find({ userId: req.params.pseudo }, function (err, apis) {
        if (err)
            return res.send({ status: 500, error: err });

        return res.send({ status: 200, apikeys: apis });
    });
}