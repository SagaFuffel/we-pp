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
        phoneNumber: {
            type: String
        },
        gender: {
            type: String,
            required: true,
        },
        date_of_birth: {
            type: String,
            required: true,
        },
        accountType: {
            type: String,
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user"
        },
    },
    {timestamps: true, versionKey: false} 
);

module.exports = mongoose.model("User", userSchema);