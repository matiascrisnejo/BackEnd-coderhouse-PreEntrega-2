import { productsModel } from "../../models/products.model.js";


export default class ProductManager{


    async getProducts(page, limit, sortOrder, category){

        try {
            const options = {
                page: page || 1,
                limit: limit || 10,
                sort: sortOrder ? {price: sortOrder === 'asc' ? 1 : -1} : null
            }
            const query = category ? {category: category} : {}

            return await productsModel.paginate(query, options)
        } catch (error) {
            console.error("error al mostrar",error)
        }

        // try {
        //     return await productsModel.find().lean()        //convierto a obj de js
        // } catch (error) {
        //     return error
        // }
    }

    async getProductsView(){
        try {
            return await productsModel.find().lean();
        } catch (err) {
            return err
        }
    }

    async getProductById(pid){
        try {
            return await productsModel.findById(pid).lean()
        } catch (err) {
            return {error: err.message}
        }
    }

    async addProducts(product){
        try {
            await productsModel.create(product)
            return await productsModel.findOne({ title: product.title })
        } catch (error) {
            return error
        }
    }

    async updateProduct(id, product){
        try {
            return await productsModel.findByIdAndUpdate(id, { $set: product})
        } catch (error) {
            return error
        }
    }
    
    async deleteProduct(id){
        try {
            return await productsModel.findByIdAndDelete(id)
        } catch (error) {
            return error
        }
    }
}