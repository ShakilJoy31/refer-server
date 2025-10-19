"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the schema for the contact form data
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure uniqueness
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt
// Create a unique index on the email field
userSchema.index({ email: 1 }, { unique: true });
// Create the model for the contact form data
const User = (0, mongoose_1.model)("user-collection", userSchema);
exports.default = User;
