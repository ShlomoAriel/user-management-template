var express = require('express')
  , router = express.Router()

// router.use('/', require('./contentController'))
router.use('/', require('./entityController'))
module.exports = router