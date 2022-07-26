const express = require('express')
const pokemon = require('../components/pokemon/routes')

const router = express.Router()

router.use('/pokemon', pokemon)

module.exports = router