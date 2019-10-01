exports.status = function (req, res) {
    res.send({ status: 200, message: "Server is online" });
}