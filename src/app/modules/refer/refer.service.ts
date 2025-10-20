// refer.service.ts
import User, { IUserForm } from "../authentication/user.model";
import { IPurchaseForm } from "./refer.controller";

export const purchaseServiceFunction = async (payload: IPurchaseForm): Promise<{ 
    referrer: IUserForm; 
    purchasedReferId: string;
}> => {
    try {
        const { referredBy, purchasedReferId } = payload;

        // Find the referrer user by ID
        const referrer = await User.findById(referredBy);
        
        if (!referrer) {
            throw new Error('Referrer not found');
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
        
        // Save the updated referrer
        await referrer.save();

        return { 
            referrer, 
            purchasedReferId 
        };
    } catch (error) {
        throw error;
    }
};