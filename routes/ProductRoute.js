const route = require('express').Router();
const productController = require('../controllers/ProductsController');

route.post('/create', productController.create);

route.post('/all', productController.consultAll);

route.post('/consult', productController.consultProduct);

route.patch('/alter/:id', productController.updateProduct);

route.delete('/delete/:uuid', productController.deleteProduct);

module.exports = route;
