exports.getUser = (req, res, next) => {
    res.status(200).json({
        posts: [{ name: 'Shamil', email: 'shamal@shamil.com' }]
    })
}