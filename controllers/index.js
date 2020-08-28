const router = require('express').Router()

router.use('/api', require('./burgers_controller.js'))
router.use('/', require('./viewController.js'))

module.exports = router