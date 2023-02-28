const RegistroModel = require('../models/cliente.model')
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/api/clientes')
})

module.exports = router;
