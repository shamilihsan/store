const { validationResult } = require('express-validator/check')

exports.getUser = (req, res, next) => {
    res.status(200).json({
        posts: [{ username: 'Shamil', email: 'shamal@shamil.com' }]
    })
}

exports.postUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
        .status(422)
        .json(
            {message: 'Validation failed. Entered user details is incorrect', errors: errors.array()
        })
    }
    const username = req.body.username;
    const email = req.body.email;

    res.status(200).json({
        message: 'User saved successfully',
        post: {
            _id: new Date().toISOString(),
            username: username,
            email: email
        }
    })
}