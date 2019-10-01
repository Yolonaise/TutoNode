const Api = require('../models/api.model');
const apiUtils = require('../utils/api.utils');
const Boom = require('boom');

exports.createApi = function (req, res) {
    if (req.body.userId == null)
        return res.send(Boom.badRequest('This function is available for registered account').output);

    if (req.body.applicationName == null)
        return res.send(Boom.badRequest('application name is missing.').output);

    Api.findOne({ applicationName: req.body.applicationName }, function (err, a) {
        if (err)
            return res.send(Boom.internal('Internal error', err).output);

        if (a != undefined)
            return res.send(Boom.conflict(`The server has already an app named ${req.body.applicationName}`).output);

        var key = apiUtils.generateKey(req.body.applicationName);
        let api = new Api({
            key: key,
            applicationName: req.body.applicationName,
            userId: req.body.userId
        });

        api.save(function (saveErr) {
            if (saveErr)
                return res.send(Boom.internal('Internal error', saveErr).output);
            else
                return res.send({ statusCode: 200, apikey: api });
        });

    });
}

exports.getApi = function (req, res) {
    if (req.params == null)
        return res.send(Boom.badRequest('No parameters available').output);

    if (req.params.pseudo == null)
        return res.send(Boom.badRequest('User parameters not found.').output);

    Api.find({ userId: req.params.pseudo }, function (err, apis) {
        if (err)
            return res.send(Boom.internal('Internal error', err).output);

        return res.send({ statusCode: 200, apikeys: apis });
    });
}