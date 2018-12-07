const Product = require('../models/product.model');

exports.getAll = function (req, res) {
    Product.find(function (err, products) {
        if (err)
            return res.send({ status: 500, error: err });

        else
            return res.send({ status: 200, products: products });

    })
};

exports.create = function (req, res) {
    let product = new Product(
        {
            nom: req.body.nom,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image
        }
    );

    product.save(function (err, product) {
        if (err)
            return res.send({ status: 500, error: err });

        else
            return res.send({ status: 200, product: product });
    });
}