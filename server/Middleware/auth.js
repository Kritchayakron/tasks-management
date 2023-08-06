const jwt = require("jsonwebtoken")
exports.auth = async(req,res,next) =>{
    try {
       const token = req.headers["authtoken"]
       if(!token) {
            return res.status(401).send('No Token');
       }
       const decoded = jwt.verify(token,'jwtsecret')
       next();
    } catch (err) {
        //console.log(err)
        return res.status(500).json({'status':500,'message' : 'Token Invalid'})
    }
}