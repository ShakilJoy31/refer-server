"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app/modules/protected-routes.ts
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// This route is protected and requires JWT token
router.get('/profile', auth_1.authenticate, (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email
            }
        }
    });
});
// Another protected route example
router.get('/dashboard', auth_1.authenticate, (req, res) => {
    res.status(200).json({
        status: 'success',
        message: `Welcome to dashboard, ${req.user.name}!`,
        data: {
            user: req.user
        }
    });
});
exports.default = router;
