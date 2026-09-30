
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
    
    if (!mongoose.Types.ObjectId.isValid(ProductId)) {
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

