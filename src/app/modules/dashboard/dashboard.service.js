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
exports.getUserDashboardId = void 0;
const user_model_1 = __importDefault(require("../authentication/user.model"));
const getUserDashboardId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(userId).select('-password'); // Exclude password
        if (!user) {
            throw new Error('User not found');
        }
        // Find all users who have this user's ID in their referredBy field
        const referredUsers = yield user_model_1.default.find({
            referredBy: userId
        }).select('name email createdAt _id');
        // Get the count of users who referred by this user
        const totalReferrals = referredUsers.length;
        // Calculate total earned (2 credits per referral)
        const totalEarned = totalReferrals * 2;
        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                referredBy: user.referredBy
            },
            referredUsers, // This will be the array of users who were referred by this user
            totalReferrals,
            totalEarned
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getUserDashboardId = getUserDashboardId;
