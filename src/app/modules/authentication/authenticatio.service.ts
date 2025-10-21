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


export const updateUser = async (userId: string, updateData: Partial<IUserForm> & { currentPassword?: string }): Promise<IUserForm> => {
  try {
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Check if email is being updated and if it already exists
    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await User.findOne({ 
        email: updateData.email, 
        _id: { $ne: userId } 
      });
      
      if (existingUser) {
        throw new Error('Email already exists');
      }
    }

    // Handle password update with current password verification
    if (updateData.password) {
      if (!updateData.currentPassword) {
        throw new Error('Current password is required to set new password');
      }

      // Verify current password
      const isCurrentPasswordValid = await user.comparePassword(updateData.currentPassword);
      if (!isCurrentPasswordValid) {
        throw new Error('Current password is incorrect');
      }

      // Set new password (the pre-save hook in the model will hash it)
      user.password = updateData.password;
      
      // Remove password fields from updateData to avoid conflicts
      delete updateData.password;
      delete updateData.currentPassword;
    }

    // Update other fields
    if (updateData.name) user.name = updateData.name;
    if (updateData.email) user.email = updateData.email;
    if (updateData.referredBy) user.referredBy = updateData.referredBy;
    if (updateData.myRefers) user.myRefers = updateData.myRefers;

    // Save the user (this will trigger the pre-save hook for password hashing)
    await user.save();

    // Return user without password
    const updatedUser = await User.findById(userId).select('-password');
    return updatedUser!;
  } catch (error) {
    throw error;
  }
};