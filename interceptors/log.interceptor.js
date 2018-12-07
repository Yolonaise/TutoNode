const logger = require('log4js');

module.exports = function (req, res, next) {
    console.log(req);

    next();
};