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
exports.updateUser = exports.getUserById = exports.loginUser = exports.createUserToDB = void 0;
// authentication.service.ts
const jwt_1 = require("../../../utility/jwt");
const user_model_1 = __importDefault(require("./user.model"));
const createUserToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_model_1.default(payload);
        yield user.save();
        // Generate JWT token
        const token = (0, jwt_1.generateToken)(user);
        return { user, token };
    }
    catch (error) {
        if (error instanceof Error) {
            if ('code' in error && error.code === 11000) {
                throw new Error('Email already exists');
            }
        }
        throw error;
    }
});
exports.createUserToDB = createUserToDB;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        // Use the comparePassword method from the model
        const isPasswordValid = yield user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        // Generate JWT token
        const token = (0, jwt_1.generateToken)(user);
        return { user, token };
    }
    catch (error) {
        throw error;
    }
});
exports.loginUser = loginUser;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(userId).select('-password'); // Exclude password
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserById = getUserById;
const updateUser = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        // Check if email is being updated and if it already exists
        if (updateData.email && updateData.email !== user.email) {
            const existingUser = yield user_model_1.default.findOne({
                email: updateData.email,
                _id: { $ne: userId }
            });
            if (existingUser) {
                throw new Error('Email already exists');
            }
        }
        // Handle password update with current password verification
        if (updateData.password) {
            if (!updateData.currentPassword) {
                throw new Error('Current password is required to set new password');
            }
            // Verify current password
            const isCurrentPasswordValid = yield user.comparePassword(updateData.currentPassword);
            if (!isCurrentPasswordValid) {
                throw new Error('Current password is incorrect');
            }
            // Set new password (the pre-save hook in the model will hash it)
            user.password = updateData.password;
            // Remove password fields from updateData to avoid conflicts
            delete updateData.password;
            delete updateData.currentPassword;
        }
        // Update other fields
        if (updateData.name)
            user.name = updateData.name;
        if (updateData.email)
            user.email = updateData.email;
        if (updateData.referredBy)
            user.referredBy = updateData.referredBy;
        if (updateData.myRefers)
            user.myRefers = updateData.myRefers;
        // Save the user (this will trigger the pre-save hook for password hashing)
        yield user.save();
        // Return user without password
        const updatedUser = yield user_model_1.default.findById(userId).select('-password');
        return updatedUser;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUser = updateUser;
