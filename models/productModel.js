const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  contactEmail: {
    type: String,
    require: true,
  },
  contactPhone: {
    type: String,
    require: true,
  },
  isVerified: {
    type: Boolean,
    require: true,
  },
});

const productSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    productName: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    inventoryCount: {
      type: Number,
      require: true,
    },
    supplier: {
      type: supplierSchema,
      require: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
