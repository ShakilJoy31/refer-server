// authentication.controller.ts
import { NextFunction, Request, Response } from 'express';
import { purchaseServiceFunction } from './refer.service';

export interface IPurchaseForm {
  referredBy: string;
  purchasedReferId: string;
}

export const purchase = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { referredBy, purchasedReferId } = req.body;
        
        // Validate required fields
        if (!referredBy || !purchasedReferId) {
            return res.status(400).json({
                status: 'error',
                message: 'referredBy and purchasedReferId are required'
            });
        }

        const result = await purchaseServiceFunction({ referredBy, purchasedReferId });

        res.status(200).json({
            status: 'success',
            message: 'Purchase recorded successfully',
            data: {
                referrer: {
                    id: result.referrer._id,
                    name: result.referrer.name,
                    email: result.referrer.email,
                    myRefers: result.referrer.myRefers
                },
                purchasedUser: {
                    id: result.purchasedUser._id,
                    name: result.purchasedUser.name,
                    email: result.purchasedUser.email,
                    isPurchased: result.purchasedUser.isPurchased
                }
            },
        });
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            if (error.message === 'Referrer not found') {
                res.status(404).json({
                    status: 'error',
                    message: 'Referrer not found',
                });
            } else if (error.message === 'Purchased user not found') {
                res.status(404).json({
                    status: 'error',
                    message: 'Purchased user not found',
                });
            } else if (error.message === 'Purchase refer ID already exists') {
                res.status(400).json({
                    status: 'error',
                    message: 'This purchase has already been recorded',
                });
            } else {
                res.status(500).json({
                    status: 'error',
                    message: 'Something went wrong',
                });
            }
        } else {
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong',
            });
        }
    }
};