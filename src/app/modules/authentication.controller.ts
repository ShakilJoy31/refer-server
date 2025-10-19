
import {
    NextFunction,
    Request,
    Response,
} from 'express';
import { createUserToDB, loginUser } from './authenticatio.service';


export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, email, password } = req.body;

        // Call the service to create a user
        const user = await createUserToDB({ name, email, password });

        res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
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


export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;

        // Call the login service
        const user = await loginUser(email, password);

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to Login',
                error: error.message,
            });
        } else {
            // Handle cases where the error is not an instance of Error
            res.status(500).json({
                status: 'error',
                message: 'Failed to Login',
                error: 'An unknown error occurred',
            });
        }
    }
};
