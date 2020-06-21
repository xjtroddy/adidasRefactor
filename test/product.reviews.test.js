process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let product_reviews = require('../public/api/product-reviews');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../public/server');
let should = chai.should();