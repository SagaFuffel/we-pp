const mongoose = require("mongoose");
const Schema = mongoose.schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone_number: {
            type: String
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user"
        },
    },
    {timestamps: true} 
);

module.exports = mongoose.model("User", userSchema);