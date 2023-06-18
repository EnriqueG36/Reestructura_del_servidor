const CartManagerMongo = require("../daos/mongo/cart.mongo");
const cartManager = new CartManagerMongo()

class CartController {

//Crear un nuevo carrito vacio    
postNewCart = async (req, res)=>{
    try{
        const newCart = await cartManager.createCart()
        res.status(200).send({
            status: "success, se ha creado un nuevo carrito",
            payload: newCart
        })

    }catch(error){
        console.log(error)
    }
}    

//Agregar un producto al carrito
postProductToCart = async (req, res)=>{
    try{
        const {cid} = req.params
        const {pid} = req.params

        console.log(cid)
       
        const showCart = await cartManager.addProductToCart(cid, pid)
        res.status(200).send({
            status: `success, se añadió el producto al carro: ${cid}`,
            payload: showCart
        })

    }catch(error){
        console.log(error)
    }
}

//Lista los productos en un carrito por el id del carrito
getProductsInCart = async (req, res)=>{
    try{
        const {cid} = req.params
        console.log(cid)
        const showCart = await cartManager.showCartProducts(cid)
        res.status(200).send({
            status: `success, se muestra el carrito: ${cid}`,
            payload: showCart
        })

    }catch(error){
        console.log(error)
    }
}

//Elimina del carrito, el producto seleccionado
deleteProductInCart = async (req, res)=>{
    try{
        const {cid} = req.params
        const {pid} = req.params
       
        const showCart = await cartManager.deleteProductFromCart(cid, pid)
        res.status(200).send({
            status: `success`,
            payload: showCart
        })  
    }catch(error){
        console.log(error)
    }
}

//Actualiza el carrito con un arreglo de productos
putProductArrayToCart = async (req, res)=>{
    try{
        const {cid} = req.params
        const productArray = req.body

        const showCart = await cartManager.addProductArrayToCart(cid, productArray)
        res.status(200).send({
            status: `success`,
            payload: showCart
        })


    }catch(error){
        console.log(error)
    }
}

//Actualiza la contidad del producto seleccionado en el carrito seleccionado
putUpdateProductQuantity = async (req, res)=>{
    try{
        const {cid} = req.params
        const {pid} = req.params
        const {productQuantity} = req.body

        if (productQuantity < 0)  {  res.send({Error: `No se admite la cantidad ${productQuantity}`})
    } else{

        const showCart = await cartManager.updateProductQuantity(cid, pid, productQuantity)       
        res.status(200).send({
            status: `success, se actualizó la cantidad del producto ${pid} a ${productQuantity} unidades`,
            payload: showCart
        })
    }
    }catch(error){
        console.log(error)
    }
}

//Elimina todos los productos del carrito
deleteAllProductsInCart = async (req, res)=>{
    try{
        const {cid} = req.params
        const showCart = await cartManager.deleteAllProductsFromCart(cid)       
        res.status(200).send({
            status: `success, se han eliminado los productos del carro: ${cid}`,
            payload: showCart
        })

    }catch(error){
        console.log(error)
    }
}

}

module.exports = CartController