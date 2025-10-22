// refer.service.ts
import User, { IUserForm } from "../authentication/user.model";
import { IPurchaseForm } from "./refer.controller";

interface PurchaseResult {
  referrer: IUserForm | null;
  purchasedUser: IUserForm;
}

export const purchaseServiceFunction = async (payload: IPurchaseForm): Promise<PurchaseResult> => {
  const { referredBy, purchasedReferId } = payload;

  // Find the purchased user by ID
  const purchasedUser = await User.findById(purchasedReferId);
  
  if (!purchasedUser) {
    throw new Error('Purchased user not found');
  }

  let referrer: IUserForm | null = null;

  // Process referral only if referredBy is provided
  if (referredBy) {
    referrer = await User.findById(referredBy);
    
    if (!referrer) {
      throw new Error('Referrer not found');
    }

    // Check if purchasedReferId already exists in myRefers array
    if (referrer.myRefers?.includes(purchasedReferId)) {
      throw new Error('Purchase refer ID already exists');
    }

    // Add purchasedReferId to myRefers array
    if (!referrer.myRefers) {
      referrer.myRefers = [];
    }
    
    referrer.myRefers.push(purchasedReferId);
  }

  // Update isPurchased to true for the purchased user
  purchasedUser.isPurchased = true;

  // Save updates - only save referrer if it exists
  const savePromises: Promise<any>[] = [purchasedUser.save()];
  if (referrer) {
    savePromises.push(referrer.save());
  }

  await Promise.all(savePromises);

  return { 
    referrer, 
    purchasedUser 
  };
};