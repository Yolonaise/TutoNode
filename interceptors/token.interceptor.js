const Jwt = require("jsonwebtoken");
const Api = require("../models/api.model");

module.exports = function (req, res, next) {
    if (req.headers == null)
        return res.send("no headers found");

    if (req.headers.apikey == null || req.header.apikey == "")
        return res.send("no api key provided");

    if (req.headers.token == null || req.header.apikey == "")
        return res.send("no token provided");

    Api.findOne({ key: req.headers.apikey }, function (err, api) {
        if (err)
            return res.send(err);

        if (api == null)
            return res.send("api key not found");

        Jwt.verify(req.headers.token, api.key, function (err, decoded) {

        });
    });
}