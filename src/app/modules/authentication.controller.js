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
exports.login = exports.signup = void 0;
const authenticatio_service_1 = require("./authenticatio.service");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Call the service to create a user
        const user = yield (0, authenticatio_service_1.createUserToDB)({ name, email, password });
        res.status(200).json({
            status: 'success',
            data: user,
        });
    }
    catch (error) {
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
        // Call the login service
        const user = yield (0, authenticatio_service_1.loginUser)(email, password);
        res.status(200).json({
            status: 'success',
            data: user
        });
    }
    catch (error) {
        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to Login',
                error: error.message,
            });
        }
        else {
            // Handle cases where the error is not an instance of Error
            res.status(500).json({
                status: 'error',
                message: 'Failed to Login',
                error: 'An unknown error occurred',
            });
        }
    }
});
exports.login = login;
