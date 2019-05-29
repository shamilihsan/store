const { validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

exports.getUser = (req, res, next) => {
    
    res.status(200).json({
        posts: [{ name: 'Shamil', email: 'shamal@shamil.com' }]
    })
}

exports.postUser = (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json(
                {
                    message: 'Validation failed. Entered user details is incorrect', errors: errors.array()
                })
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    bcrypt
    .hash(password, 15)
    .then(hashedPassword => {
        const user = new User({
            email: email,
            password: hashedPassword,
            name: name
        })
        return user.save()
    })
    .then(result => {
        res.status(201).json({
            message: 'User saved successfully',
            user: result
        })
    }).catch(err => console.log(err))
    
}