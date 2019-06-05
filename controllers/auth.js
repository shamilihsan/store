const { validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

var hashkey = 'secretkey';

exports.login = (req, res, next) => {

    const email = req.body.email
    const password = req.body.password

    let loadeduser

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const error = new Error('A user with the email ' + email + ' could not be found')
                error.statusCode = 401
                throw error
            }
            loadeduser = user

            return bcrypt.compare(password, user.password)
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Incorrect password')
                error.statusCode = 401
                throw error
            }
            const token = jwt.sign(
                {
                    email: loadeduser.email,
                    userId: loadeduser._id.toString()
                },
                hashkey,
                { expiresIn: '1h' }
            )

            res.status(200).json({ token: token, userId: loadeduser._id.toString() })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })

}

exports.postUser = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed during signing up')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }

    const email = req.body.email
    const password = req.body.password
    const name = req.body.name

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
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })

}

exports.deleteUser = (req, res, next) => {
    const email = req.body.email

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const error = new Error('A user with the email ' + email + ' could not be found')
                error.statusCode = 401
                throw error
            }

            return User.findOneAndDelete({email: email})

        })
        .then(result => {
            res.status(200).json({ message: 'User deleted' })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}