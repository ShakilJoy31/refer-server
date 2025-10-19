import { model, Schema } from 'mongoose';

// Define the interface for the contact form data
export interface IContactForm {
    name: string;
    email: string;
    message: string;
}

// Define the schema for the contact form data
const contactFormSchema = new Schema<IContactForm>({
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
const ContactForm = model<IContactForm>("ContactForm", contactFormSchema);

export default ContactForm;