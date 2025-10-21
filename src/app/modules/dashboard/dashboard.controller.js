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
exports.getUserDashboardById = void 0;
const dashboard_service_1 = require("./dashboard.service");
const getUserDashboardById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query; // Get ID from query params
        if (!id) {
            return res.status(400).json({
                status: 'error',
                message: 'User ID is required'
            });
        }
        const result = yield (0, dashboard_service_1.getUserDashboardId)(id);
        res.status(200).json({
            status: 'success',
            data: {
                user: result.user,
                referredUsers: result.referredUsers, // Array of users referred by this user
                referralStats: {
                    totalReferrals: result.totalReferrals,
                    totalEarned: result.totalEarned
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
exports.getUserDashboardById = getUserDashboardById;
