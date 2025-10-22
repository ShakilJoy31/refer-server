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
        // Validate required field
        if (!purchasedReferId) {
            return res.status(400).json({
                status: 'error',
                message: 'purchasedReferId is required'
            });
        }
        const result = yield (0, refer_service_1.purchaseServiceFunction)({ referredBy, purchasedReferId });
        const response = {
            status: 'success',
            message: 'Purchase recorded successfully',
            data: {
                purchasedUser: {
                    id: result.purchasedUser._id,
                    name: result.purchasedUser.name,
                    email: result.purchasedUser.email,
                    isPurchased: result.purchasedUser.isPurchased
                }
            }
        };
        // Only include referrer data if referral exists
        if (result.referrer) {
            response.data.referrer = {
                id: result.referrer._id,
                name: result.referrer.name,
                email: result.referrer.email,
                myRefers: result.referrer.myRefers
            };
        }
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Purchase error:', error);
        if (error instanceof Error) {
            const errorMessages = {
                'Referrer not found': () => res.status(404).json({
                    status: 'error',
                    message: 'Referrer not found',
                }),
                'Purchased user not found': () => res.status(404).json({
                    status: 'error',
                    message: 'Purchased user not found',
                }),
                'Purchase refer ID already exists': () => res.status(400).json({
                    status: 'error',
                    message: 'This purchase has already been recorded',
                })
            };
            const handler = errorMessages[error.message];
            if (handler) {
                return handler();
            }
        }
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});
exports.purchase = purchase;
