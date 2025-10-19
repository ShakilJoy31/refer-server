import { model, Schema } from 'mongoose';

// Define the interface for the contact form data
export interface IUserForm {
    name: string;
    email: string;
    password: string;
}

// Define the schema for the contact form data
const userSchema = new Schema<IUserForm>({
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
const User = model<IUserForm>("user-collection", userSchema);

export default User;