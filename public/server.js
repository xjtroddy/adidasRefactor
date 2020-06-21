var product = require('./api/product-service');
var PORT = process.env.PORT || 3029;

var server_app = product.listen(PORT, function() {
  console.log('Express server for product service listening on port ' + PORT);
});
