const Jwt = require("jsonwebtoken");
const Api = require("../models/api.model");
const User = require("../models/user.model");

module.exports = function (req, res, next) {
    if (req.headers == null)
        return res.send({ status: 498, error: "token is missing" });

    if (req.headers.apikey == null || req.header.apikey == "")
        return res.send({ status: 401, error: "apiKey is missing" });

    if (req.headers.token == null || req.header.apikey == "")
        return res.send({ status: 498, error: "token is missing" });

    Api.findOne({ key: req.headers.apikey }, function (err, api) {
        if (err)
            return res.send(err);

        if (api == null)
            return res.send({ status: 401, error: "apiKey not found" });

        Jwt.verify(req.headers.token, api.key, function (err, decoded) {
            if (err)
                return res.send(err);

            User.findOne({ pseudo: decoded.username }, function (err, user) {
                if (err)
                    return res.send(err);

                req.user = user;

                next();
            });
        });
    });
}