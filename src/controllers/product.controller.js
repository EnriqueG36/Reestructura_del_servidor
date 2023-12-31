const ProductManagerMongo = require("../daos/mongo/product.mongo")
const productManager = new ProductManagerMongo()

class ProductController {

//Obtiene todos los productos en la colección    
getProducts = async (req, res)=>{
try{
	//req.querys, valores por default
	const {limit=5} = req.query
	const {page=1} = req.query
	const {query=null} = req.query
	const {sort} = req.query

	const products = await productManager.getProducts(limit, page, query, sort)
	res.status(200).send({
	status: "succes",
	payload: products
	})
	
}catch(error){
	console.log(error)
	}

}

//añade un nuevo producto a la colección
postProduct = async (req, res)=>{
	try{
	const newProduct = req.body
    
	
	let result = await productManager.addProduct(newProduct)
	res.status(200).send({
		status: "success",
		payload: result
		})

}catch(error){
    console.log(error)
}
}

//Obtiene un producto por su id
 getProductById = async (req, res)=>{
	try{
	const {pid} = req.params
	let product = await productManager.getProductById(pid)
	res.status(200).send({
		status: "success",
		payload: product
		})

}catch(error){
	console.log (error)
}
}

//Elimina un producto por su id
deleteProductById = async (req, res)=>{
	try{
	const {pid} = req.params
	let product = await productManager.deleteProductById(pid)
	res.status(200).send({
		status: "success",
		payload: product
		})

}catch(error){
	console.log (error)
}
}

//Actualiza un producto por su id
putProductbyId = async (req, res)=>{
	try{
	const {pid} = req.params
    const productToUpdate = req.body
	let product = await productManager.updateProductById(pid, productToUpdate)
	res.status(200).send({
		status: "success",
		payload: product
		})

}catch(error){
	console.log (error)
}
}

}

module.exports =  ProductController 

