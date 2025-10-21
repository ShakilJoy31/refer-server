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
exports.purchase = void 0;
const refer_service_1 = require("./refer.service");
const purchase = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { referredBy, purchasedReferId } = req.body;
        // Validate required fields
        if (!referredBy || !purchasedReferId) {
            return res.status(400).json({
                status: 'error',
                message: 'referredBy and purchasedReferId are required'
            });
        }
        const result = yield (0, refer_service_1.purchaseServiceFunction)({ referredBy, purchasedReferId });
        res.status(200).json({
            status: 'success',
            message: 'Purchase recorded successfully',
            data: {
                referrer: {
                    id: result.referrer._id,
                    name: result.referrer.name,
                    email: result.referrer.email,
                    myRefers: result.referrer.myRefers
                },
                purchasedUser: {
                    id: result.purchasedUser._id,
                    name: result.purchasedUser.name,
                    email: result.purchasedUser.email,
                    isPurchased: result.purchasedUser.isPurchased
                }
            },
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            if (error.message === 'Referrer not found') {
                res.status(404).json({
                    status: 'error',
                    message: 'Referrer not found',
                });
            }
            else if (error.message === 'Purchased user not found') {
                res.status(404).json({
                    status: 'error',
                    message: 'Purchased user not found',
                });
            }
            else if (error.message === 'Purchase refer ID already exists') {
                res.status(400).json({
                    status: 'error',
                    message: 'This purchase has already been recorded',
                });
            }
            else {
                res.status(500).json({
                    status: 'error',
                    message: 'Something went wrong',
                });
            }
        }
        else {
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong',
            });
        }
    }
});
exports.purchase = purchase;
