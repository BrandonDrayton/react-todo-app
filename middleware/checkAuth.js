const models = require('../models')

async function checkAuth(req, res, next) {
    // if not logged in send error
    if (!req.session.user) {
        res.status(401).json({ error: 'unauthorized' })
        return
    }
    // get user from database
    const user = await models.User.findByPk(req.session.user.id)
    if (!user) {
        // cancel session and respond with error
        req.session.user = null
        res.status(401).json({ error: 'unauthorized' })
        return
    }

    // attach to req
    req.session.user = user

    // call into next middleware
    next()
}

module.exports = checkAuth