const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')           

router.post('/super-important-route', async (req, res) => {
    if(req.session.userId){
        console.log('Do the really super important thing')
        res.send('Done')
    } else {
        console.log('You are not authorized to do the super important thing')
        res.send('Denied')
    }
})


router.get('/profile', async (req, res) => {
    try {
        // Split the authorization header into [ "Bearer", "TOKEN" ]:
        const [authenticationMethod, token] = req.headers.authorization.split(' ')

        // Only handle "Bearer" authorization for now 
        //  (we could add other authorization strategies later):
        if (authenticationMethod == 'Bearer') {

            // Decode the JWT
            const result = await jwt.decode(process.env.JWT_SECRET, token)

            // Get the logged in user's id from the payload
            const { id } = result.value

            // Find the user object using their id:
            let user = await User.findOne({
                where: {
                    userId: id
                }
            })
            res.json(user)
        }
    } catch {
        res.json(null)
    }
})

