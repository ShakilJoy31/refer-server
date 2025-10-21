// authentication.controller.ts
import { NextFunction, Request, Response } from 'express';
import { createUserToDB, getUserById, loginUser, updateUser } from './authenticatio.service';
import { IUserForm } from './user.model';


export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, referredBy } = req.body;
        
        const { user, token } = await createUserToDB({ name, email, password, referredBy } as IUserForm);

        res.status(201).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    referredBy: user.referredBy
                },
                token
            },
        });
    } catch (error) {
        console.log(error)
        if (error instanceof Error && error.message === 'Email already exists') {
            res.status(400).json({
                status: 'error',
                message: 'Email already exists',
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong',
            });
        }
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const { user, token } = await loginUser(email, password);

        res.status(200).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    referredBy: user.referredBy
                },
                token
            }
        });
    } catch (error) {
        if (error instanceof Error) {
            const statusCode = error.message === 'User not found' || error.message === 'Invalid credentials' ? 401 : 500;
            res.status(statusCode).json({
                status: 'error',
                message: error.message,
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: 'An unknown error occurred',
            });
        }
    }
};




export const getUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query; // Get ID from query params
        
        if (!id) {
            return res.status(400).json({
                status: 'error',
                message: 'User ID is required'
            });
        }

        const user = await getUserById(id as string);

        res.status(200).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    referredBy: user.referredBy,
                    myRefers: user.myRefers
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


export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params; // Get ID from URL params
        const updateData = req.body; // Get update data from request body
        
        if (!id) {
            return res.status(400).json({
                status: 'error',
                message: 'User ID is required'
            });
        }

        const updatedUser = await updateUser(id, updateData);

        res.status(200).json({
            status: 'success',
            data: {
                user: {
                    id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    referredBy: updatedUser.referredBy,
                    myRefers: updatedUser.myRefers
                }
            }
        });
    } catch (error) {
        if (error instanceof Error && error.message === 'User not found') {
            res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        } else if (error instanceof Error && error.message === 'Email already exists') {
            res.status(400).json({
                status: 'error',
                message: 'Email already exists',
            });
        } else if (error instanceof Error && error.message === 'Current password is required to set new password') {
            res.status(400).json({
                status: 'error',
                message: 'Current password is required to set new password',
            });
        } else if (error instanceof Error && error.message === 'Current password is incorrect') {
            res.status(400).json({
                status: 'error',
                message: 'Current password is incorrect',
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong',
            });
        }
    }
};