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
exports.purchaseServiceFunction = void 0;
// refer.service.ts
const user_model_1 = __importDefault(require("../authentication/user.model"));
const purchaseServiceFunction = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { referredBy, purchasedReferId } = payload;
        // Find the referrer user by ID
        const referrer = yield user_model_1.default.findById(referredBy);
        if (!referrer) {
            throw new Error('Referrer not found');
        }
        // Check if purchasedReferId already exists in myRefers array
        if (referrer.myRefers && referrer.myRefers.includes(purchasedReferId)) {
            throw new Error('Purchase refer ID already exists');
        }
        // Add purchasedReferId to myRefers array
        if (!referrer.myRefers) {
            referrer.myRefers = [];
        }
        referrer.myRefers.push(purchasedReferId);
        // Save the updated referrer
        yield referrer.save();
        return {
            referrer,
            purchasedReferId
        };
    }
    catch (error) {
        throw error;
    }
});
exports.purchaseServiceFunction = purchaseServiceFunction;
