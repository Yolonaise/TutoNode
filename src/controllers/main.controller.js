exports.status = function (req, res) {
    return res.send({ statusCode: 200, message: "Server is online" });
}