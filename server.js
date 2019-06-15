const express = require('express')
const app = express()
const db = require('./db/db')
const shortid = require('shortid')

const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

// GET all users
app.get('/api/exercise/users', (req, res) => {
  db.select().from('users').then(users => {
    res.send(users)
  })
})

// POST new user
app.post('/api/exercise/new-user', (req, res) => {
  db('users').insert({
    username: req.body.username,
    id: shortid.generate()
  }).then(() => {
    db('users').where('username', req.body.username)
    .then(user => {
      res.send(user)
    })
  })
})

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
