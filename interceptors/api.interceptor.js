const Api = require('../models/api.model');

module.exports = function (req, res, next) {
    if (req.headers == null)
        return res.boom.unauthorized('missing headers - api interceptor');

    if (req.headers.apikey == null)
        return res.boom.unauthorized('apikey cannot be null');

    Api.findOne({ key: req.headers.apikey }, function (err, api) {
        if (err)
            return res.boom.internal('Internal error', err);

        if (api == null)
            return res.boom.unauthorized("api is not valid");

        next();
    });
};