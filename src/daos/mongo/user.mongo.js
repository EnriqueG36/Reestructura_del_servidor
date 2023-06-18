//Contiene la lógica para recibir datos de usuario

const userModel = require('../model/user.model.js')         //Importamos el userModel de moongose
//Dado que ahora el user lleva un campo de cart id, traemos el cartManager para crear un nuevo carro a la vez que un nuevo ususario se registra
const CartManager = require('./cart.mongo.js')      //Importamos el cartManager
const cartManager = new CartManager()               //NUeva instancia de cart manager

const { createHash, isValidPassword } = require('../../utils/utils.js') //Se usa para encriptar el password de un nuevo user

class UserManagerMongo {

    //crear un nuevo usuario
    async createUser(first_name, last_name, email, age, password){
        try{

            const cart = await cartManager.createCart()      //Crea un nuevo carrito para el nuevo usuario
            let role                                        //COntendrá el role del usuario
        
            //Definimos un nuevo objeto con los datos de nuevo usuario
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),                            //encriptado
                cart,                              
                role
            }

            return newUser

        }catch(erro){
            return new Error(err)
        }
    }

       //encontrar un usuario existente 
       async findUser(email){
       try{

            return userModel.findOne({email})

        }catch(erro){
            return new Error(err)
        }
    }


}

module.exports = UserManagerMongo                           //Exportamos nuestra clase userManagerMongo