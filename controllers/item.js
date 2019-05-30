const { validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Item = require('../models/item')

var hashkey = 'secretkey';

exports.getItems = (req, res, next) => {
    
}
