// authentication.controller.ts
import { NextFunction, Request, Response } from 'express';
import { purchaseServiceFunction } from './refer.service';

export interface IPurchaseForm {
  referredBy?: string;
  purchasedReferId: string;
}

export const purchase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { referredBy, purchasedReferId } = req.body;
    
    // Validate required field
    if (!purchasedReferId) {
      return res.status(400).json({
        status: 'error',
        message: 'purchasedReferId is required'
      });
    }

    const result = await purchaseServiceFunction({ referredBy, purchasedReferId });

    const response: any = {
      status: 'success',
      message: 'Purchase recorded successfully',
      data: {
        purchasedUser: {
          id: result.purchasedUser._id,
          name: result.purchasedUser.name,
          email: result.purchasedUser.email,
          isPurchased: result.purchasedUser.isPurchased
        }
      }
    };

    // Only include referrer data if referral exists
    if (result.referrer) {
      response.data.referrer = {
        id: result.referrer._id,
        name: result.referrer.name,
        email: result.referrer.email,
        myRefers: result.referrer.myRefers
      };
    }

    res.status(200).json(response);
  } catch (error) {
    console.error('Purchase error:', error);
    
    if (error instanceof Error) {
      const errorMessages = {
        'Referrer not found': () => res.status(404).json({
          status: 'error',
          message: 'Referrer not found',
        }),
        'Purchased user not found': () => res.status(404).json({
          status: 'error',
          message: 'Purchased user not found',
        }),
        'Purchase refer ID already exists': () => res.status(400).json({
          status: 'error',
          message: 'This purchase has already been recorded',
        })
      };

      const handler = errorMessages[error.message as keyof typeof errorMessages];
      if (handler) {
        return handler();
      }
    }

    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};