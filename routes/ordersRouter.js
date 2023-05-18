const { Router } = require('express');
const Route = Router();

const controller = require('../controllers/ordersController');

Route.get('/orders', controller.orders_get);
Route.post('/orders', controller.orders_post);

Route.get('/orders/track', controller.orders_track_get);
Route.post('/orders/track', controller.orders_track_post);

module.exports = Route;