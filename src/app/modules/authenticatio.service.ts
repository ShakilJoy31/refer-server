import User, { IUserForm } from "./user.model"

export const createUserToDB = async (payload: IUserForm): Promise<IUserForm> => {
    try {
        const user = new User(payload);
        await user.save();
        return user;
    } catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            // Check for MongoDB duplicate key error (code 11000)
            if ('code' in error && error.code === 11000) {
                throw new Error('Email already exists');
            }
        }
        throw error; // Re-throw other errors
    }
};



export const loginUser = async (email: string, password: string): Promise<IUserForm> => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Compare passwords directly (not recommended for production)
    if (user.password !== password) {
      throw new Error('Invalid credentials');
    }

    // Return the user data
    return user;
  } catch (error) {
    throw error;
  }
};