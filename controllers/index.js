var express = require('express')
  , router = express.Router()

// router.use('/', require('./contentController'))
router.use('/', require('./entityController'))
router.use('/', require('./seasonController'))
module.exports = router