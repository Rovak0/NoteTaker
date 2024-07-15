//this is the holding file for the modularzation
const router = require('express').Router();


const postRouter = require('./notes');

router.use('/notes', postRouter);


module.exports = router;