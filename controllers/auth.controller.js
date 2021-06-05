const {usuarios} = require("../models/index");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');


module.exports ={

    //Login parte 1
    checkMail(req,res){
        let email= req.body.email;
        usuarios.findOne({
            where:{
                email:email
            }
        }).then(user =>{
            if(!user){
                res.status(404).json({msg:"No existe usuario con ese mail."})
            } else if(user.estado === 0){
                    res.status(401).json({msg:"Todavia se esta verificando tu cuenta. Por favor sea paciente", estado:user.estado})
            } else if(user.estado === 1){
                    res.status(401).json({msg:"Cuenta existente pero todavia no indico su password", estado:user.estado})
            } else {
                    res.status(200).json({msg:"Cuenta existente y estado: aprobado", estado:user.estado});
                }
        
        }).catch(err=>{
            res.status(500).json(err);
        })
    },
    //Login parte 2
    checkPass(req,res){
        let {email, password} = req.body;
        usuarios.findOne({
            where:{
                email:email
            }
        }).then(user =>{
            if(!user){
                res.status(404).json({msg:"No existe usuario con ese mail."})
            } else {
                if( bcrypt.compareSync(password,user.password)){
                    //passwords coinciden. Devuelvo token.

                    let token = jwt.sign({user:user},authConfig.secret);

                    res.status(200).json({
                        user:user,
                        token:token
                    })

                } else {
                    res.status(401).json({msg:"contraseña incorrecta"})
                }
            }
        })

    },

    //primer login con usuario autorizado
    generatePass(req,res){
        //encripta la password generada
        let email = req.body.email
        let password = bcrypt.hashSync(req.body.password, +authConfig.rounds);

        usuarios.update({
            password: password,
            estado:2
        },
        {
            returning:true, 
            plain:true,
            where:{
                estado:1,
                email:email
            }
        }).then(result=>{
            res.status(404).json({msg:"Se cambio la pass correctamente",result:result[1]})
        }).catch(err =>{
            res.status(500).json({msg:"No se pudo cambiar la password, ya se hizo anteriormente o el usuario todavia no esta autorizado"})
        })

    },

    //Registro de usuario (con autorizacion pendiente)
    signUp(req,res){

        //Crear un usuario
        usuarios.create({
            idUsuario:  Math.floor(Math.random()*100000),
            email: req.body.email,
            categoria:"basica",
            password:"",
            documento: req.body.documento || "",
            nombre: req.body.nombre || "",
            direccion:req.body.direccion || "",
            estado: 0,
            imagen: req.body.imagen || "",
        }).then (user =>{
            let token = jwt.sign({user:user},authConfig.secret);

            res.json({
                user:user,
                token:token
            });
        }).catch(err => 
            res.status(500).json(err))

    }
}