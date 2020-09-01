var express = require('express');
var json2xml = require("json2xml");
var router = express.Router();

const catalog = [
    { id: 1, name: 'Samsung J1', price: 400.00 },
    { id: 2, name: 'Hawei PSmart', price: 800.00 },
    { id: 3, name: 'Motorola E6', price: 480.00 },
    { id: 4, name: 'Iphone X', price: 1200.00 },
];

router.get('/', function(request, response) {
    var data = {
        items: catalog
    };
    var xml_catalog = json2xml(data);
    response.setHeader('Content-Type', 'application/xml');
    response.send(xml_catalog);
});

router.get('/', function(request, response) {
    //response.send(catalog);
    response.json(catalog);
});

router.get('/:product_id', function(request, response) {
    const product_id = request.params.product_id;
    var product = catalog.find(item => item.id == product_id);
    //response.send(catalog);
    response.json(product);
});


module.exports = router;