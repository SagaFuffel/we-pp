const mongoose = require("mongoose");
const Product = require("../models/productModel");

const createProduct = async (req, res) => {
    const user_id = req.user._id
    const { productName, category, description, price, inventoryCount, supplier } = req.body, user_id;

    try {
        const product = await Product.create({ productName, category, description, price, inventoryCount, supplier})
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

const updateProductById = async (req,res) => {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({message: "Invalid product Id"})
    }

    const { productName, category, description, price, inventoryCount, supplier } = req.body;

    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: productId},
            {productName, category, description, price, inventoryCount, supplier},
            {new:true},
        );

        if (!updatedProduct) {
            res.status(404).json({message:" 404 Not Found "})
        } 
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).message({message: error.message})
    }
};

//getAll
const getAllProducts = async (req, res) => {

    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: "Could not get all products"})
    }
}


//delete  (:productId)
const deleteProduct = async (req, res) => {
    const {productId} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(ProductId)) {
        res.status(400).json({message: "Invalid id"}) //might be 500
    }
    try {
        const deleteProduct =  await Product.findByIdAndDelete({_id: productId});
        if (deleteProduct) {
            res.status(204).send(); //send empty
        } else {
            res.status(404).json({message: "Not found"})
        }
    } catch (error) {
        res.status(500).json({message: "Could not delete product"})
    }
};



//getById  (:productId)
const getProductById = async (req, res) => {
    const {productId} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400).json({message: "Invalid id"}) //might be 500
    }
    try {
        const product =  await Product.findById({_id: productId});
        if (product) {
            res.status(204).send(product); 
        } else {
            res.status(404).json({message: "Not found"})
        }
    } catch (error) {
        res.status(500).json({message: "Could not get product by id"})
    }
};



module.exports = {
    createProduct,
    updateProductById,
    getAllProducts,
    getProductById,
    deleteProduct
};
