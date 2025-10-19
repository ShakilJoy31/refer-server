"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app/modules/refer-server-routes.ts
const express_1 = __importDefault(require("express"));
const authentication_controller_1 = require("./authentication/authentication.controller");
const protected_routes_1 = __importDefault(require("./protected-routes"));
const router = express_1.default.Router();
// Public routes
router.post("/signup", authentication_controller_1.signup);
router.post("/login", authentication_controller_1.login);
// Protected routes (require JWT token)
router.use(protected_routes_1.default);
exports.default = router;
