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
exports.deleteContactFromDB = exports.getContactByIdFromDB = exports.getContactFromDB = exports.createContactToDB = void 0;
const newbook_model_1 = __importDefault(require("./newbook.model"));
const createContactToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new newbook_model_1.default(payload);
        yield user.save();
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.createContactToDB = createContactToDB;
const getContactFromDB = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;
        // Fetch data with pagination
        const contacts = yield newbook_model_1.default.find()
            .skip(skip)
            .limit(limit)
            .exec();
        // Get the total number of documents for pagination metadata
        const total = yield newbook_model_1.default.countDocuments();
        return {
            contacts,
            total,
            page,
            limit,
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getContactFromDB = getContactFromDB;
const getContactByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the contact by ID from the database
        const contact = yield newbook_model_1.default.findById(id).exec();
        return contact;
    }
    catch (error) {
        throw error;
    }
});
exports.getContactByIdFromDB = getContactByIdFromDB;
const deleteContactFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Assuming you're using a MongoDB model (e.g., ContactModel)
    const deletedContact = yield newbook_model_1.default.findByIdAndDelete(id);
    return deletedContact;
});
exports.deleteContactFromDB = deleteContactFromDB;
