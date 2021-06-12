
const express = require('express')
const router = express.Router()
// 引用 passport
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/', (req, res) => {
  const id = req.user.id

  return Todo.findAll({
    raw: true, nest: true,
    where: {
      userId: id
    }
  }
  )
    .then((todos) => {
      return res.render('index', { todos: todos })
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

module.exports = router