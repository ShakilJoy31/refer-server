// authentication.service.ts
import { generateToken } from "../../../utility/jwt";
import User, { IUserForm } from "./user.model";


export const createUserToDB = async (payload: IUserForm): Promise<{ user: IUserForm; token: string }> => {
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

export const loginUser = async (email: string, password: string): Promise<{ user: IUserForm; token: string }> => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Use the comparePassword method from the model
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = generateToken(user);

    return { user, token };
  } catch (error) {
    throw error;
  }
};



export const getUserById = async (userId: string): Promise<IUserForm> => {
  try {
    const user = await User.findById(userId).select('-password'); // Exclude password
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
};