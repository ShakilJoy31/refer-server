"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookself_controller_1 = require("./bookself.controller");
const authentication_controller_1 = require("./authentication.controller");
const router = express_1.default.Router();
// !Routes for the users
router.post("/add-contact-information", bookself_controller_1.createContact);
router.get("/get-contact-information", bookself_controller_1.getContactInformation);
router.get("/get-individual-contact/:id", bookself_controller_1.getContactById);
router.delete("/delete-contact/:id", bookself_controller_1.deleteContact);
router.post("/signup", authentication_controller_1.signup);
router.post("/login", authentication_controller_1.login);
exports.default = router;
