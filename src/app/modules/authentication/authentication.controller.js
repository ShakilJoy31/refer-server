"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = exports.getUserByIdController = exports.login = exports.signup = void 0;
const authenticatio_service_1 = require("./authenticatio.service");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, referredBy } = req.body;
        const { user, token } = yield (0, authenticatio_service_1.createUserToDB)({ name, email, password, referredBy });
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
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error && error.message === 'Email already exists') {
            res.status(400).json({
                status: 'error',
                message: 'Email already exists',
            });
        }
        else {
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong',
            });
        }
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { user, token } = yield (0, authenticatio_service_1.loginUser)(email, password);
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
    }
    catch (error) {
        if (error instanceof Error) {
            const statusCode = error.message === 'User not found' || error.message === 'Invalid credentials' ? 401 : 500;
            res.status(statusCode).json({
                status: 'error',
                message: error.message,
            });
        }
        else {
            res.status(500).json({
                status: 'error',
                message: 'An unknown error occurred',
            });
        }
    }
});
exports.login = login;
const getUserByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query; // Get ID from query params
        if (!id) {
            return res.status(400).json({
                status: 'error',
                message: 'User ID is required'
            });
        }
        const user = yield (0, authenticatio_service_1.getUserById)(id);
        res.status(200).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    isPurchased: user.isPurchased,
                    referredBy: user.referredBy,
                    myRefers: user.myRefers
                }
            }
        });
    }
    catch (error) {
        if (error instanceof Error && error.message === 'User not found') {
            res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }
        else {
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong',
            });
        }
    }
});
exports.getUserByIdController = getUserByIdController;
const updateUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Get ID from URL params
        const updateData = req.body; // Get update data from request body
        if (!id) {
            return res.status(400).json({
                status: 'error',
                message: 'User ID is required'
            });
        }
        const updatedUser = yield (0, authenticatio_service_1.updateUser)(id, updateData);
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
    }
    catch (error) {
        if (error instanceof Error && error.message === 'User not found') {
            res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }
        else if (error instanceof Error && error.message === 'Email already exists') {
            res.status(400).json({
                status: 'error',
                message: 'Email already exists',
            });
        }
        else if (error instanceof Error && error.message === 'Current password is required to set new password') {
            res.status(400).json({
                status: 'error',
                message: 'Current password is required to set new password',
            });
        }
        else if (error instanceof Error && error.message === 'Current password is incorrect') {
            res.status(400).json({
                status: 'error',
                message: 'Current password is incorrect',
            });
        }
        else {
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong',
            });
        }
    }
});
exports.updateUserController = updateUserController;
