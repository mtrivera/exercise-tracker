const express = require('express')
const app = express()
const cors = require('cors')
const shortid = require('shortid')
// SQLite
const fs = require('fs')
const dbFile = './db/.data/sqlite.db'
const dbExists = fs.existsSync(dbFile)
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(dbFile, err => {
  if (err) {
    console.error(err.message)
  }
  console.log('Connected to the exercise-tracker database')
})

const dropTables = `
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS exercises;
`

const createTables = `
  CREATE TABLE users(
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL
  );
`

const seedUsers = `
  INSERT INTO
    users (username)
  VALUES
    ('example1'),
    ('example2'),
    ('example3'),
    ('example4'),
    ('example5');
`

/*
  CREATE TABLE exercises(
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    title TEXT NOT NULL,
    duration INT NOT NULL,
    created_at DATE DEFAULT date('now'),

  FOREIGN KEY (username) REFERENCES users(username) 
  )

  INSERT INTO
  exercises(username, title, duration, created_at)
VALUES
  ('example1', 'Bench Press', 3, '2019-12-01'),
  ('example2', 'Overhead Press', 5, '2019-12-11'),
  ('example3', 'Barbell Squat', 7)
*/

app.use(cors())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

db.serialize(() => {
  if (!dbExists) {
    db.run(dropTables)
    console.log('Drop tables')
    db.run(createTables)
    console.log('Tables created!')
    db.run(seedUsers)
    console.log('Seed users!')
  } else {
    console.log('Database ready to go!')
  }
})

// GET all users
app.get('/api/exercise/users', (req, res) => {
  db.serialize(() => {
    db.all('SELECT * FROM users', (err, rows) => {
      if (rows) {
        res.send(rows)
      }
    })
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
/*
// Close db connection
db.close(err => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection');
})
*/
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
