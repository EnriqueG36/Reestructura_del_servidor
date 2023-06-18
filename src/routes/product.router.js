//Endpoint para manejar los productos

const{Router} = require('express')
const ProductController  = require('../controllers/product.controller')		//Importamos la clase ProductController
//const ProductManager = require('../daos/mongo/product.mongo.js') //Importamos nuestro productManager hecho con la persistencia en mongo

const productController = new ProductController()

//productController = new ProductController()										//Instanciamos la clase productController

const router = Router()	//Intanciamos router

//Aqui van todos los endpoints para productos

//Obtiene todos los productos en la colección
router.get('/', productController.getProducts)

//Añade un nuevo producto a la coleccion
router.post('/', productController.postProduct)

//Obtiene un producto por su id
router.get('/:pid', productController.getProductById)

//Elimina un producto por su id
router.delete('/:pid', productController.deleteProductById)

//Actualiza un producto por su id
router.put('/:pid', productController.putProductbyId)

module.exports = router