import User from "../authentication/user.model";

export const getUserDashboardId = async (userId: string): Promise<any> => {
  try {
    const user = await User.findById(userId).select('-password'); // Exclude password
    if (!user) {
      throw new Error('User not found');
    }

    // Find all users who have this user's ID in their referredBy field
    const referredUsers = await User.find({
      referredBy: userId
    }).select('name email createdAt _id');

    // Get the count of users who referred by this user
    const totalReferrals = referredUsers.length;
    
    // Calculate total earned (2 credits per referral)
    const totalEarned = totalReferrals * 2;

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        referredBy: user.referredBy
      },
      referredUsers, // This will be the array of users who were referred by this user
      totalReferrals,
      totalEarned
    };
  } catch (error) {
    throw error;
  }
};