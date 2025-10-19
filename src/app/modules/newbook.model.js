"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the schema for the contact form data
const contactFormSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt
// Create the model for the contact form data
const ContactForm = (0, mongoose_1.model)("ContactForm", contactFormSchema);
exports.default = ContactForm;
