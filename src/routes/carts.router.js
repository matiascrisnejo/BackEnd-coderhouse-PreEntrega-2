import express from "express"
import CartManager from "../Dao/controllers/Mongo/cartManagerMongo.js"
import { __dirname } from "../utils.js"


//esto es fs
//import CartManager from "../Dao/controllers/fs/productManager.js"
//const cm=new CartManager(__dirname+'/Dao/database/carts.json')

const cm = new CartManager()
const routerC =express.Router()

routerC.get("/",async(req,res)=>{
   const carrito = await  cm.getCarts()
   res.json({carrito})
})

routerC.get("/:cid",async(req,res)=>{
  const { cid }= req.params
  const result = await cm.findCartById(cid)
  res.send({ result: "success", payload: result })
  //res.json({cart})

})


routerC.post("/", async (req, res) => {
    const cart = await cm.addCart()
    res.json({ cart })
  });

  routerC.post("/:cid/products/:pid", async (req, res) => {
    
    const { cid, pid } = req.params;
    const cart = await cm.addProductToCart(cid, pid) 
    res.json({ cart });
  });

  routerC.delete("/:cid/:pid", async (req, res) => {
    const {cid, pid} = req.params;
    const cart = await cm.deleteProduct(cid, pid)
    res.json({ cart })
  })
  

export default routerC