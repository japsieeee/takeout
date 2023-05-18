const { Router } = require('express');
const Route = Router();

const controller = require('../controllers/staffsController');

Route.get('/staffs/signup', controller.staff_get_signup);
Route.get('/staffs/login', controller.staff_get_login);

Route.post('/staffs/signup', controller.staff_post_signup);
Route.post('/staffs/login', controller.staff_post_login);
Route.get('/staffs/logout', controller.staff_post_logout);

module.exports = Route;