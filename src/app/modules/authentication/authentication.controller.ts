// authentication.controller.ts
import { NextFunction, Request, Response } from 'express';
import { createUserToDB, loginUser } from './authenticatio.service';


export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        
        const { user, token } = await createUserToDB({ name, email, password } as any);

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