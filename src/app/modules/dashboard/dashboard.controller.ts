import { NextFunction, Request, Response } from "express";
import { getUserDashboardId } from "./dashboard.service";

export const getUserDashboardById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query; // Get ID from query params
        
        if (!id) {
            return res.status(400).json({
                status: 'error',
                message: 'User ID is required'
            });
        }

        const result = await getUserDashboardId(id as string);

        res.status(200).json({
            status: 'success',
            data: {
                user: result.user,
                referredUsers: result.referredUsers, // Array of all users referred by this user
                convertedUsers: result.convertedUsers, // Array of users who actually purchased
                referralStats: {
                    totalReferrals: result.referralStats.totalReferrals,
                    totalConverted: result.referralStats.totalConverted,
                    totalEarned: result.referralStats.totalEarned
                }
            }
        });
    } catch (error) {
        if (error instanceof Error && error.message === 'User not found') {
            res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong',
            });
        }
    }
};