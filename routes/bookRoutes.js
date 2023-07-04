const express = require('express');
const router =  express.Router();

const bookController = require('../controllers/bookController');

router.post('/upload',bookController.addBook);
router.get('/fetch',bookController.getAllBook);
router.get('/fetch/:isbn',bookController.getBookByISBN);
router.delete('/delete/:isbn',bookController.deleteBookByISBN);

module.exports =  router;