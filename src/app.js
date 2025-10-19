"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const refer_server_routes_1 = __importDefault(require("./app/modules/refer-server-routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
// Root route
app.get("/", (req, res) => {
    res.send("Refer server is running");
});
app.use("/api/v1/filesure-assignment", refer_server_routes_1.default);
exports.default = app;
