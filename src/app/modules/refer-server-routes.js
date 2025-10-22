"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app/modules/refer-server-routes.ts
const express_1 = __importDefault(require("express"));
const authentication_controller_1 = require("./authentication/authentication.controller");
const refer_controller_1 = require("./refer/refer.controller");
const dashboard_controller_1 = require("./dashboard/dashboard.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Public routes
router.post("/signup", authentication_controller_1.signup);
router.post("/login", authentication_controller_1.login);
router.get("/get-user-by-id", auth_1.authenticate, authentication_controller_1.getUserByIdController);
router.put("/update-user-by-id/:id", authentication_controller_1.updateUserController);
// Refer
router.put("/purchase-book", refer_controller_1.purchase);
// Fetching dashboard data
router.get("/get-user-refer", dashboard_controller_1.getUserDashboardById);
exports.default = router;
