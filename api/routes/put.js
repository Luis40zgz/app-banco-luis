import express from 'express'
import users from './usersAccounts.json' assert { type: 'json' }
var router = express.Router()

/* GET home page. */
router.put('/update/', function (req, res, next) {
  res.json(users)
})

export default router
