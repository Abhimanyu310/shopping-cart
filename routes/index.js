var express = require('express');
var router = express.Router();

var Product = require('../models/product');
var Cart = require('../models/cart');


/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find(function (err, doc) {
        res.render('shop/index', { title: 'Express', products: doc });
    });
});

router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function (err, product) {
        if (err){
           return res.redirect('/');
        }
        cart.add(product, productId);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});



module.exports = router;
