const jwt = require('jsonwebtoken')

const auth = function(req, res, next){
    try {
        const bearerHeader = req.headers['authorization'];
        if(!bearerHeader) return res.status(401).send({status:false, message: "token must be present"})

        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, "secret", (err, decodedToken) => {
            if (err) return res.status(401).send({ status: false, message: "Incorrect token" })
            
            req.userId = decodedToken.userId;
            next();
        })
    } catch (error) {
        return res.status(500).send({status : false, message : error.message})
    }
}

module.exports = {auth}