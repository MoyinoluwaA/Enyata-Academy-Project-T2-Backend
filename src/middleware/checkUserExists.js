const { getUser } = require("../services/user")

const checkUserExists = (type) => async(req, res, next) => {
    try {
        const { body: { email }} = req
        const [ user ] = await getUser(email)

        if (type === 'register') {
            if (user) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'User already exists. Log in',
                    data: []
                })
            }
    
            next()
        } 

    }
    catch (err) {
        next(err)
    }
}

module.exports = checkUserExists