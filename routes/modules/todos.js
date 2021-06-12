
const express = require('express')
const router = express.Router()
// 引用 passport
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  // console.log(req.user.id)
  const UserId = req.user.id
  const name = req.body.name
  console.log('userId: ' + UserId)
  console.log(name)
  console.log('準備新增')
  Todo.create({
    name,
    UserId
  })
    .then(() => {
      console.log('新增成功')
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })

})



router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => { console.log(error) })
})

router.get('/:id/edit', (req, res) => {
  console.log(req.params.id)
  console.log(req.user)
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(error => { console.log(error) })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  const { isDone, name } = req.body
  console.log(id)
  console.log(isDone + ' ' + name)
  console.log(UserId)
  Todo.findOne({
    where: {
      UserId,
      id
    }
  })
    .then((todo) => {
      todo.name = name
      todo.isDone = isDone === 'on'
      todo.UserId = UserId
      todo.save()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })
})


// 刪除 post
router.delete('/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  Todo.destroy({
    where: {
      // criteria
      id
    }
  })
    .then(() => {
      console.log('刪除成功')
      res.redirect('/')
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})





module.exports = router