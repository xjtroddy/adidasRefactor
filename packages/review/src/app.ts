import * as bodyParser from 'body-parser'
import * as config from 'config'
import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import * as mongoose from 'mongoose'
import * as morgan from 'morgan'
import * as mysql from 'mysql'

import * as User from './models/user'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || config.app.port || 3000
mongoose.connect(config.storage.mongo.url)
app.set('superSecret', config.app.secret)

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'product',
  insecureAuth: true
})
const sql = 'select * from product_reviews'

con.connect(function (err) {
  if (err) throw err
  con.query(sql, function (err, result) {
    if (err) throw err
  })
})

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use(morgan('dev'))

app.get('/', function (req, res) {
  res.send('Hello! The API is running at http://localhost:' + PORT)
})

app.get('/setup', function(req, res) {

  const user = new User({
    name: 'default',
    password: 'password',
    admin: true
  })

  user.save(function (err) {
    if (err) throw err

    res.json({
      success: true
    })
  })
})

const apiRoutes = express.Router()

apiRoutes.post('/authenticate', function (req, res) {

  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      })
    } else if (user) {
      if (user.password !== req.body.password) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        })
      } else {
        const payload = {
          admin: user.admin
        }
        const token = jwt.sign(payload, app.get('superSecret'), {
          expiresIn: 1440
        })

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token,
        })
      }
    }
  })
})

apiRoutes.use(function (req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        })
      } else {
        req.decoded = decoded
        next()
      }
    })

  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
})

apiRoutes.get('/', function (req, res) {
  res.json({
    message: 'Welcome to the product reviews API'
  })
})

apiRoutes.get('/users', function (req, res) {
  User.find({}, function (err, users) {
    res.json(users)
  })
})

app.use('/api', apiRoutes)

app.get('/api/review/:product_id', (req, res) => {
  const id = req.params.product_id
  con.query('select * from product_reviews where product_id =?', [id], function (err, rows) {
    if (err) throw err
    res.json({
      rows
    })
  })
})

app.post('/api/review/', (req, res) => {
  const input = JSON.parse(JSON.stringify(req.body))
  const data = {
    product_id: input.product_id,
    avg_review_score: input.avg_review_score,
    num_of_reviews: input.num_of_reviews
  }
  con.query('insert into product_reviews set ?', data, function (err, rows) {
    if (err) throw err
    res.json({
      rows
    })
  })
})

app.put('/api/review/:product_id', (req, res) => {
  const input = JSON.parse(JSON.stringify(req.body))
  const id = req.params.product_id
  const data = {
    avg_review_score: input.avg_review_score,
    num_of_reviews: input.num_of_reviews
  }
  con.query('update product_reviews set ? where product_id = ?', [data, id], function (err, rows) {
    if (err) throw err
    res.json({
      rows
    })
  })
})

app.delete('/api/review/:product_id', (req, res) => {
  const id = req.params.product_id
  con.query('delete from product_reviews where product_id =?', [id], function (err: Error, rows) {
    if (err) throw err
    res.json({
      rows
    })
  })
})

app.use(express.static(__dirname + '/'))
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
module.exports = app
