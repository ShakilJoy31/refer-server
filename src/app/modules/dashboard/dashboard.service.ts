import User from "../authentication/user.model";

export const getUserDashboardId = async (userId: string): Promise<any> => {
  try {
    const user = await User.findById(userId).select('-password'); // Exclude password
    if (!user) {
      throw new Error('User not found');
    }

    // Find all users who have this user's ID in their referredBy field (total referred users)
    const referredUsers = await User.find({
      referredBy: userId
    }).select('name email createdAt _id');

    // Find users who actually purchased (converted users) - users whose IDs are in myRefers array
    const convertedUsers = await User.find({
      _id: { $in: user.myRefers || [] }
    }).select('name email createdAt _id');

    // Get the counts
    const totalReferrals = referredUsers.length;
    const totalConverted = convertedUsers.length;
    
    // Calculate total earned (2 credits per converted user)
    const totalEarned = totalConverted * 2;

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        referredBy: user.referredBy,
        myRefers: user.myRefers // Include myRefers if needed
      },
      referredUsers, // All users who used referral link
      convertedUsers, // Only users who purchased (from myRefers)
      referralStats: {
        totalReferrals,
        totalConverted,
        totalEarned
      }
    };
  } catch (error) {
    throw error;
  }
};