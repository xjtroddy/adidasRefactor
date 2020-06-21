import * as config from 'config'
import * as express from 'express'
import * as fetch from 'node-fetch'

process.env.NODE_CONFIG_DIR= __dirname + '/packages/product/config'
// var app = require('./product-reviews');
const app = express()
app.use(express.json())
const PORT = process.env.PORT || config.app.port || 3000

function get (url: string) {
  return new Promise((resolve, reject) => {
    fetch(url, {})
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}

app.get('/api/product/:product_id', (req, res) => {
  Promise.all([
      get(`https://www.adidas.co.uk/api/products/${req.params.product_id}`),
      get(`${config.service.review.host}/api/review/${req.params.product_id}?token=${req.query.token}`),
    ]).then(([product, {
        rows,
      }]) =>
      res.send({
        reviews: rows,
        product,
      }))
    .catch(err => res.send('Ops, something has gone wrong'))
});

app.use(express.static(__dirname + '/'))
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
