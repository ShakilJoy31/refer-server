// refer.service.ts
import User, { IUserForm } from "../authentication/user.model";
import { IPurchaseForm } from "./refer.controller";

export const purchaseServiceFunction = async (payload: IPurchaseForm): Promise<{ 
    referrer: IUserForm; 
    purchasedUser: IUserForm;
}> => {
    try {
        const { referredBy, purchasedReferId } = payload;

        // Find the referrer user by ID
        const referrer = await User.findById(referredBy);
        
        if (!referrer) {
            throw new Error('Referrer not found');
        }

        // Find the purchased user by ID
        const purchasedUser = await User.findById(purchasedReferId);
        
        if (!purchasedUser) {
            throw new Error('Purchased user not found');
        }

        // Check if purchasedReferId already exists in myRefers array
        if (referrer.myRefers && referrer.myRefers.includes(purchasedReferId)) {
            throw new Error('Purchase refer ID already exists');
        }

        // Add purchasedReferId to myRefers array
        if (!referrer.myRefers) {
            referrer.myRefers = [];
        }
        
        referrer.myRefers.push(purchasedReferId);
        
        // Update isPurchased to true for the purchased user
        purchasedUser.isPurchased = true;

        // Save both updates
        await Promise.all([
            referrer.save(),
            purchasedUser.save()
        ]);

        return { 
            referrer, 
            purchasedUser 
        };
    } catch (error) {
        throw error;
    }
};