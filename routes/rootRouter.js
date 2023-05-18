const express = require('express');
const Route = express.Router();

const controller = require('../controllers/rootController');

Route.get('/', controller.root_get);
Route.post('/', controller.root_post);

module.exports = Route;