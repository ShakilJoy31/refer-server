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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUserToDB = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const createUserToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_model_1.default(payload);
        yield user.save();
        return user;
    }
    catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            // Check for MongoDB duplicate key error (code 11000)
            if ('code' in error && error.code === 11000) {
                throw new Error('Email already exists');
            }
        }
        throw error; // Re-throw other errors
    }
});
exports.createUserToDB = createUserToDB;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the user by email
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        // Compare passwords directly (not recommended for production)
        if (user.password !== password) {
            throw new Error('Invalid credentials');
        }
        // Return the user data
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.loginUser = loginUser;
