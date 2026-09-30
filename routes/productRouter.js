const express = require("express");
const router = express.Router();
const {
    createProduct,
    updateProductById,
    getAllProducts,
    getProductById,
    deleteProduct
} = require("../controllers/productContollers")
const requireAuth = require("../middleware/requireAuth")

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.use(requireAuth)

router.post("/", createProduct);

router.put("/:id", updateProductById);

router.put("/:id", deleteProduct);

module.exports = router;