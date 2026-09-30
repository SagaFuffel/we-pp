const mongoose = require("mongoose");
import Product from "../models/productModel";

const createProduct = async (req, res) => {
    const { productName, category, description, price, inventoryCount, supplier } = req.body

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

module.exports = {
    createProduct,
    updateProductById
}
