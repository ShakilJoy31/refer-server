import { generateToken } from "../../../utility/jwt";
import User, { IUserForm } from "../authentication/user.model";



export const purchaseServiceFunction = async (payload: IUserForm): Promise<{ user: IUserForm; token: string }> => {
    try {
        const user = new User(payload);
        await user.save();
        
        // Generate JWT token
        const token = generateToken(user);
        
        return { user, token };
    } catch (error) {
        if (error instanceof Error) {
            if ('code' in error && error.code === 11000) {
                throw new Error('Email already exists');
            }
        }
        throw error;
    }
};