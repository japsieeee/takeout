const { Router } = require('express');
const Route = Router();
const { requireAuth } = require('../middleware/authMiddleware');

// requiring controller
const controller = require('../controllers/panelController');

Route.get('/panel', requireAuth , controller.panel_get);

Route.get('/panel/reviews', requireAuth, controller.panel_reviews_get);
Route.post('/panel/reviews/:id', requireAuth, controller.panel_reviews_post);



Route.get('/panel/orders', requireAuth, controller.panel_orders_get);
Route.post('/panel/orders/:id', requireAuth, controller.panel_orders_post);


module.exports = Route;