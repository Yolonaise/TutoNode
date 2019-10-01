const Api = require('../models/api.model');
const Boom = require('boom');

module.exports = function (req, res, next) {
    if (req.headers == null)
        return res.send(Boom.unauthorized('missing headers - api interceptor').output);

    if (req.headers.apikey == null)
        return res.send(Boom.unauthorized('apikey cannot be null').output);

    Api.findOne({ key: req.headers.apikey }, function (err, api) {
        if (err)
            return res.send(Boom.internal('Internal error', err).output);

        if (api == null)
            return res.send(Boom.unauthorized("api is not valid").output);

        next();
    });
};