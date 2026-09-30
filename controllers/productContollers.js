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
