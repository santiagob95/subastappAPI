const jwt = require('jsonwebtoken');
module.exports={
     
    validateToken(req,res,next){
        console.log("validando token...")
        const token = req.body.token
        if( token ==null) {
        return res.status(401).json("Error de validacion de sesion")
        }
        jwt.verify(token, "subastappsecret",(err,user)=>{
        if(err) 
            return res.sendStatus(403).json("No tienes permisos para realizar esa accion")
        req.user = user
        next()
        })
    }
}